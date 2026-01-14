import { useState, useEffect } from 'react';
import api from '../config/api';
import GigCard from '../components/GigCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async (search = '') => {
    try {
      setLoading(true);
      const params = search ? { search } : {};
      const response = await api.get('/gigs', { params });
      setGigs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching gigs:', error);
      setGigs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchGigs();
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Compact for logged-in users */}
      {/* Hero Section - Compact for logged-in users */}
      {!user && (
        <div className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-100/50 blur-3xl"></div>
            <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-purple-100/50 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="text-center max-w-3xl mx-auto animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Find Your Next <span className="text-transparent bg-clip-text gradient-primary">Masterpiece</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
                Connect with elite freelancers and bring your vision to life. <br className="hidden sm:block" />
                GigFlow is the premium marketplace for exceptional talent.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  to="/register"
                  className="gradient-primary text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  Start Hiring
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-gray-700 border border-gray-200 hover:border-primary-500 hover:text-primary-600 px-8 py-3 rounded-full font-semibold transition-all hover:shadow-md"
                >
                  Find Work
                </Link>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-10 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">10k+</p>
                <p className="text-sm text-gray-500">Active Gigs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">50k+</p>
                <p className="text-sm text-gray-500">Freelancers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-500">Satisfaction</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-500">Support</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Starts right after navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          {user && (
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Available Gigs</h2>
                <p className="text-gray-600 mt-1">Find your next project or hire top talent</p>
              </div>
              <Link
                to="/create-gig"
                className="gradient-primary text-white px-6 py-2 rounded-lg font-semibold hover:shadow-medium transition-all whitespace-nowrap"
              >
                + Post a Gig
              </Link>
            </div>
          )}

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search gigs by title, skill, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-soft"
                />
              </div>
              <button
                type="submit"
                className="gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-medium transition-all whitespace-nowrap"
              >
                Search
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner fullScreen />}

        {/* No Results */}
        {!loading && gigs.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="mb-4 text-5xl">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No gigs found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Check back soon for new opportunities'}
            </p>
            {!user && (
              <Link
                to="/register"
                className="inline-block gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-medium transition-all"
              >
                Create an Account
              </Link>
            )}
          </div>
        )}

        {/* Gigs Grid */}
        {!loading && gigs.length > 0 && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600 font-medium">
                Found <span className="text-blue-600 font-bold">{gigs.length}</span> gig
                {gigs.length !== 1 ? 's' : ''}
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>Newest First</option>
                <option>Budget: Low to High</option>
                <option>Budget: High to Low</option>
              </select>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
              {gigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Stats Section */}
      {!user && (
        <div className="bg-gray-50 py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">1000+</p>
                <p className="text-gray-600 font-medium">Active Gigs</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">5000+</p>
                <p className="text-gray-600 font-medium">Freelancers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">₹2Cr+</p>
                <p className="text-gray-600 font-medium">Paid Out</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

