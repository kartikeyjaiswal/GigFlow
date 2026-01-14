import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateGig from './pages/CreateGig';
import GigDetail from './pages/GigDetail';
import { GOOGLE_CLIENT_ID } from './config/google';

function App() {
  // Only wrap with GoogleOAuthProvider if we have a valid Client ID
  const hasValidClientId = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== 'placeholder';

  const content = (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 pt-20">
              <Navbar />
              <Notification />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/create-gig"
                  element={
                    <ProtectedRoute>
                      <CreateGig />
                    </ProtectedRoute>
                  }
                />
                <Route path="/gig/:id" element={<GigDetail />} />
              </Routes>
            </div>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );

  if (hasValidClientId) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {content}
      </GoogleOAuthProvider>
    );
  }

  return content;
}

export default App;
