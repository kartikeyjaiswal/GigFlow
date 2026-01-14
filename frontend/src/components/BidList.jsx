import { useState } from 'react';
import { getStatusColor, getStatusLabel } from '../utils/helpers';

const BidList = ({ bids, gigStatus, isOwner, onHire, onReject, loading = false }) => {
  const [hiringSoon, setHiringSoon] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  const handleHireClick = (bidId) => {
    if (window.confirm('Are you sure you want to hire this freelancer?')) {
      setHiringSoon(bidId);
      onHire(bidId);
    }
  };

  const handleRejectClick = (bidId) => {
    setRejectingId(bidId);
    onReject(bidId);
    // Reset rejecting state after a timeout in case the parent doesn't re-render immediately
    setTimeout(() => setRejectingId(null), 2000);
  };

  if (bids.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-4xl mb-3">👀</div>
        <p className="text-gray-600 font-medium">No bids yet</p>
        <p className="text-gray-500 text-sm mt-1">Check back soon for freelancer responses</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <div
          key={bid._id}
          className={`rounded-xl p-6 border-2 transition-all shadow-soft hover:shadow-medium ${bid.status === 'hired'
              ? 'border-green-500 bg-green-50'
              : bid.status === 'rejected'
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <p className="font-bold text-lg text-gray-900">
                {bid.freelancerId?.name || 'Unknown Freelancer'}
              </p>
              <p className="text-sm text-gray-600 mt-1">{bid.freelancerId?.email || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                ₹{bid.price}
              </p>
              <span
                className={`mt-2 px-3 py-1 rounded-full text-xs font-bold inline-block ${bid.status === 'hired'
                    ? 'bg-green-200 text-green-800'
                    : bid.status === 'rejected'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}
              >
                {bid.status === 'hired' && '✓ '}
                {getStatusLabel(bid.status)}
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="text-gray-700 leading-relaxed mb-4 bg-white bg-opacity-50 p-4 rounded-lg">
            "{bid.message}"
          </p>

          {/* Action Button */}
          {isOwner && bid.status === 'pending' && gigStatus === 'open' && (
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleHireClick(bid._id)}
                disabled={loading || hiringSoon === bid._id || rejectingId === bid._id}
                className="flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-medium"
              >
                {hiringSoon === bid._id ? '⏳ Hiring...' : '✓ Hire This Freelancer'}
              </button>
              <button
                onClick={() => handleRejectClick(bid._id)}
                disabled={loading || hiringSoon === bid._id || rejectingId === bid._id}
                className="px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rejectingId === bid._id ? '⏳' : '✕ Reject'}
              </button>
            </div>
          )}

          {/* Status Indicators */}
          {bid.status === 'hired' && (
            <div className="mt-4 pt-4 border-t border-green-300">
              <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                <span className="text-lg">✅</span>
                Freelancer has been hired for this project
              </p>
            </div>
          )}

          {bid.status === 'rejected' && (
            <div className="mt-4 pt-4 border-t border-red-300">
              <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                <span className="text-lg">❌</span>
                This bid was not selected
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BidList;
