import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300 gradient-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-white text-primary-600 px-3 py-2 rounded-lg font-bold text-lg shadow-sm group-hover:shadow-md transition-all">
              GigFlow
            </div>
            <span className="ml-2 text-xs font-semibold text-blue-100 uppercase tracking-wider">Freelance</span>
          </Link>

          {/* Center Navigation */}
          {user && (
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-blue-100 hover:text-white px-3 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-all"
              >
                Browse Gigs
              </Link>
              <Link
                to="/create-gig"
                className="text-blue-100 hover:text-white px-3 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition-all"
              >
                Post a Gig
              </Link>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="flex items-center space-x-3 pr-4 border-r border-blue-400/30">
                  <div className="w-10 h-10 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-sm">
                    <span className="font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-blue-200">Member</p>
                  </div>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all backdrop-blur-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:bg-gray-50 transition-all font-bold"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

