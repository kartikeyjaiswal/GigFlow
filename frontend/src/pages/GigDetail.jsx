import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import BidList from '../components/BidList';
import LoadingSpinner from '../components/LoadingSpinner';

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [myBid, setMyBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBids, setLoadingBids] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidForm, setBidForm] = useState({ message: '', price: '' });
  const [error, setError] = useState('');
  const [submittingBid, setSubmittingBid] = useState(false);

  useEffect(() => {
    fetchGig();
  }, [id]);

  useEffect(() => {
    if (user && gig) {
      if (gig.ownerId._id === user._id) {
        fetchBids();
      } else {
        fetchMyBid();
      }
    }
  }, [user, gig]);

  const fetchGig = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/gigs/${id}`);
      setGig(response.data);
    } catch (error) {
      console.error('Error fetching gig:', error);
      setError('Failed to load gig details');
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      setLoadingBids(true);
      const response = await api.get(`/bids/${id}`);
      setBids(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching bids:', error);
      setBids([]);
    } finally {
      setLoadingBids(false);
    }
  };

  const fetchMyBid = async () => {
    try {
      const response = await api.get(`/bids/gig/${id}/my-bid`);
      setMyBid(response.data);
    } catch (error) {
      console.error('Error fetching my bid:', error);
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setSubmittingBid(true);
      await api.post('/bids', {
        gigId: id,
        message: bidForm.message,
        price: bidForm.price,
      });
      setBidForm({ message: '', price: '' });
      setShowBidForm(false);
      alert('Bid submitted successfully!');
      fetchGig(); // Refresh gig data
      fetchMyBid(); // Fetch the new bid
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit bid');
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleHire = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert('Freelancer hired successfully!');
      fetchBids(); // Refresh bids
      fetchGig(); // Refresh gig data
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to hire freelancer');
    }
  };

  const handleReject = async (bidId) => {
    if (!window.confirm('Are you sure you want to reject this bid? This cannot be undone.')) {
      return;
    }
    try {
      await api.patch(`/bids/${bidId}/reject`);
      fetchBids(); // Refresh bids to show rejected status
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to reject bid');
    }
  };

  const isOwner = user && gig && gig.ownerId._id === user._id;

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gig Not Found</h1>
          <p className="text-gray-600 mb-6">The gig you're looking for doesn't exist or has been deleted.</p>
          <Link to="/" className="inline-block gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-medium transition-all">
            Back to Gigs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8">
          ← Back to Gigs
        </Link>

        {/* Gig Header Card */}
        <div className="bg-white rounded-xl shadow-medium p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{gig.title}</h1>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <strong>{gig.ownerId?.name}</strong>
                </span>
              </div>
            </div>
            <span
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-soft ${gig.status === 'open'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
                }`}
            >
              {gig.status === 'open' ? '🔓 Open' : '✓ Assigned'}
            </span>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{gig.description}</p>
          </div>

          {/* Budget Section */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-1">Project Budget</p>
            <p className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">₹{gig.budget}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <span className="text-red-600 font-bold text-xl">⚠</span>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Bids Section */}
        {isOwner ? (
          <div className="bg-white rounded-xl shadow-medium p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              💼 Bids Received
              <span className="ml-auto text-2xl text-blue-600 bg-blue-100 px-4 py-1 rounded-full">
                {bids.length}
              </span>
            </h2>
            {loadingBids ? (
              <LoadingSpinner />
            ) : (
              <BidList
                bids={bids}
                gigStatus={gig.status}
                isOwner={true}
                onHire={handleHire}
                onReject={handleReject}
              />
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-medium p-8">
            {myBid ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bid</h2>
                <div className={`p-6 rounded-xl border-2 ${myBid.status === 'hired'
                    ? 'border-green-500 bg-green-50'
                    : myBid.status === 'rejected'
                      ? 'border-red-300 bg-red-50'
                      : 'border-blue-200 bg-blue-50'
                  }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-lg text-gray-900">Bid Status</p>
                      <p className="text-sm text-gray-600">Submitted on {new Date(myBid.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-bold text-sm ${myBid.status === 'hired'
                        ? 'bg-green-200 text-green-800'
                        : myBid.status === 'rejected'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                      {myBid.status === 'hired' ? '✓ Hired' : myBid.status === 'rejected' ? '❌ Rejected' : '⏳ Pending'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Your Price</p>
                    <p className="text-2xl font-bold text-gray-900">₹{myBid.price}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Your Pitch</p>
                    <p className="text-gray-700 bg-white/50 p-3 rounded-lg border border-gray-200/50">"{myBid.message}"</p>
                  </div>

                  {myBid.status === 'rejected' && (
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <p className="text-red-700 font-medium">Unfortunately, your bid was not selected for this project. Better luck next time!</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              gig.status === 'open' ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Bid</h2>
                  {!user ? (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">🔐</div>
                      <p className="text-gray-600 mb-6 text-lg font-medium">Sign in to submit a bid</p>
                      <Link
                        to="/login"
                        className="inline-block gradient-primary text-white px-8 py-3 rounded-lg hover:shadow-medium transition-all font-semibold"
                      >
                        Sign In to Bid
                      </Link>
                    </div>
                  ) : (
                    <>
                      {!showBidForm ? (
                        <button
                          onClick={() => setShowBidForm(true)}
                          className="w-full gradient-primary text-white px-6 py-4 rounded-lg hover:shadow-medium transition-all font-bold text-lg"
                        >
                          + Submit a Bid
                        </button>
                      ) : (
                        <form onSubmit={handleBidSubmit} className="space-y-6">
                          {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                              <span className="text-red-600 font-bold">⚠</span>
                              <p className="text-red-700 text-sm">{error}</p>
                            </div>
                          )}

                          {/* Price Field */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                              Your Bid Price (₹) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold">₹</span>
                              <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-soft transition-all"
                                value={bidForm.price}
                                onChange={(e) => setBidForm({ ...bidForm, price: e.target.value })}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">The amount you're willing to complete this project for</p>
                          </div>

                          {/* Message Field */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                              Your Pitch <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              required
                              rows="5"
                              placeholder="Tell the client why you're perfect for this project:&#10;- Your relevant experience&#10;- How you'll approach the work&#10;- Expected timeline&#10;- Why you're a great fit"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-soft transition-all resize-none"
                              value={bidForm.message}
                              onChange={(e) => setBidForm({ ...bidForm, message: e.target.value })}
                            />
                            <p className="text-xs text-gray-500 mt-2">Be specific and professional - good pitches win more projects</p>
                          </div>

                          {/* Submit Buttons */}
                          <div className="flex gap-4 pt-4 border-t border-gray-200">
                            <button
                              type="submit"
                              disabled={submittingBid}
                              className="flex-1 gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-medium transition-all font-bold disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                              {submittingBid ? '⏳ Submitting...' : '✓ Submit Bid'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowBidForm(false);
                                setBidForm({ message: '', price: '' });
                                setError('');
                              }}
                              className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  )}
                </>
              ) : null
            )}
          </div>
        )}

        {/* Assigned Message */}
        {!isOwner && gig.status === 'assigned' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <p className="text-blue-900 font-medium">✓ This project has already been assigned to a freelancer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetail;

