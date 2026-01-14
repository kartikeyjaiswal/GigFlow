import express from 'express';
import Gig from '../models/Gig.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/gigs
// @desc    Fetch all open gigs (with search query)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const query = { status: 'open' };

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const gigs = await Gig.find(query)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/gigs
// @desc    Create a new job post
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    // Validation
    if (!title || !description || !budget) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const gig = await Gig.create({
      title,
      description,
      budget: Number(budget),
      ownerId: req.user._id,
      status: 'open',
    });

    const populatedGig = await Gig.findById(gig._id).populate('ownerId', 'name email');

    res.status(201).json(populatedGig);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/gigs/:id
// @desc    Get a single gig
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

