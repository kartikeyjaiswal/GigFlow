import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  return (
    <Link to={`/gig/${gig._id}`}>
      <div className="bg-white rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden group cursor-pointer h-full border border-gray-100">
        {/* Header with status badge */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-start gap-3 mb-3">
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
              {gig.title}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                gig.status === 'open'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {gig.status === 'open' ? '✓ Open' : '✓ Assigned'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 py-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 h-18">
            {gig.description}
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-gradient-light border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">₹{gig.budget}</p>
              <p className="text-xs text-gray-500 mt-1">Budget</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Posted by</p>
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                {gig.ownerId?.name || 'Unknown'}
              </p>
            </div>
          </div>
        </div>

        {/* Hover action indicator */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Click to view details</span>
          <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
