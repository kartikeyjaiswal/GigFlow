import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

const CreateGig = () => {
  const [formData, setFormData] = useState({ title: '', description: '', budget: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [charCounts, setCharCounts] = useState({ title: 0, description: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'title' || name === 'description') {
      setCharCounts(prev => ({ ...prev, [name]: value.length }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.budget || formData.budget <= 0) {
      setError('Budget must be greater than 0');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/gigs', formData);
      navigate(`/gig/${response.data._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a New Gig</h1>
          <p className="text-lg text-gray-600">Share your project details and let freelancers bid on your work</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-medium p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <span className="text-red-600 font-bold text-xl">⚠</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Title Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Gig Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                maxLength="100"
                placeholder="e.g., Build a React Dashboard Application"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-soft transition-all"
                value={formData.title}
                onChange={handleChange}
              />
              <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500">Clear, concise title that describes your project</p>
                <span className="text-xs font-medium text-gray-500">{charCounts.title}/100</span>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows="8"
                maxLength="2000"
                placeholder="Describe your project in detail:&#10;- What are the main requirements?&#10;- What deliverables do you expect?&#10;- What timeline are you looking for?&#10;- Any specific technologies or skills needed?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-soft transition-all resize-none"
                value={formData.description}
                onChange={handleChange}
              />
              <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500">Detailed descriptions attract better quality bids</p>
                <span className="text-xs font-medium text-gray-500">{charCounts.description}/2000</span>
              </div>
            </div>

            {/* Budget Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Your Budget <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold text-lg">₹</span>
                <input
                  name="budget"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-soft transition-all"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">This is the amount you're willing to pay for this project</p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>💡 Pro Tip:</strong> Be specific and detailed in your project description. Include requirements, timeline, and any technical specifications. This helps you receive higher quality bids.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 gradient-primary text-white font-semibold py-3 rounded-lg hover:shadow-medium transition-all disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting Your Gig...' : 'Post Gig'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold py-3 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm font-medium text-gray-900">Get Quick Responses</p>
            <p className="text-xs text-gray-600 mt-1">Bids start coming in within hours</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm font-medium text-gray-900">Find Perfect Match</p>
            <p className="text-xs text-gray-600 mt-1">Compare skilled freelancers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-medium text-gray-900">Secure & Reliable</p>
            <p className="text-xs text-gray-600 mt-1">Safe payment protection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;

