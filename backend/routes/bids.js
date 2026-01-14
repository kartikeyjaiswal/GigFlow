import express from 'express';
import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import { protect } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route   POST /api/bids
// @desc    Submit a bid for a gig
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    // Validation
    if (!gigId || !message || !price) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if gig exists and is open
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'Gig is no longer open' });
    }

    // Check if user already bid on this gig
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });

    if (existingBid) {
      return res.status(400).json({ message: 'You have already bid on this gig' });
    }

    // Create bid
    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price: Number(price),
      status: 'pending',
    });

    const populatedBid = await Bid.findById(bid._id)
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title');

    res.status(201).json(populatedBid);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/bids/:gigId
// @desc    Get all bids for a specific gig (Owner only)
// @access  Private
router.get('/:gigId', protect, async (req, res) => {
  try {
    const { gigId } = req.params;

    // Check if gig exists and user is the owner
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view bids for this gig' });
    }

    const bids = await Bid.find({ gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PATCH /api/bids/:bidId/hire
// @desc    Hire a freelancer (Atomic update with transaction)
// @access  Private
router.patch('/:bidId/hire', protect, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    // Get the bid with the gig
    const bid = await Bid.findById(bidId)
      .populate('gigId')
      .session(session);

    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Store freelancerId and gigId before transaction commits
    const freelancerId = bid.freelancerId.toString();

    // Check if user is the gig owner
    if (bid.gigId.ownerId.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Not authorized to hire for this gig' });
    }

    // Check if gig is still open
    if (bid.gigId.status !== 'open') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Gig is no longer open' });
    }

    // Check if bid is still pending
    if (bid.status !== 'pending') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Bid is no longer pending' });
    }

    // Store gig title before transaction
    const gigTitle = bid.gigId.title;
    const gigId = bid.gigId._id.toString();

    // Atomic operations in transaction
    // 1. Update the gig status to 'assigned'
    await Gig.findByIdAndUpdate(
      bid.gigId._id,
      { status: 'assigned' },
      { session }
    );

    // 2. Update the selected bid to 'hired'
    await Bid.findByIdAndUpdate(
      bidId,
      { status: 'hired' },
      { session }
    );

    // 3. Reject all other bids for this gig
    await Bid.updateMany(
      {
        gigId: bid.gigId._id,
        _id: { $ne: bidId },
        status: 'pending',
      },
      { status: 'rejected' },
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Get updated bid with populated fields
    const updatedBid = await Bid.findById(bidId)
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title description');

    // Emit Socket.io event for real-time notification
    const io = req.app.get('io');
    io.emit('hired', {
      userId: freelancerId,
      message: `You have been hired for ${gigTitle}!`,
      gigId: gigId,
      gigTitle: gigTitle,
    });

    res.json({
      message: 'Freelancer hired successfully',
      bid: updatedBid,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PATCH /api/bids/:bidId/reject
// @desc    Reject a bid
// @access  Private
router.patch('/:bidId/reject', protect, async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).populate('gigId');

    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    // Check if user is the gig owner
    if (bid.gigId.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to reject this bid' });
    }

    // Check if gig is still open
    if (bid.gigId.status !== 'open') {
      return res.status(400).json({ message: 'Cannot reject bids for closed gigs' });
    }

    // Update bid status
    bid.status = 'rejected';
    await bid.save();

    // Emit Socket.io event for real-time notification
    const io = req.app.get('io');
    io.emit('bid_rejected', {
      userId: bid.freelancerId,
      message: `Your bid for ${bid.gigId.title} was rejected.`,
      gigId: bid.gigId._id,
      gigTitle: bid.gigId.title
    });

    res.json({ message: 'Bid rejected', bid });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/bids/gig/:gigId/my-bid
// @desc    Get current user's bid for a specific gig
// @access  Private
router.get('/gig/:gigId/my-bid', protect, async (req, res) => {
  try {
    const { gigId } = req.params;

    const bid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id
    });

    if (!bid) {
      return res.json(null); // No bid found
    }

    res.json(bid);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

