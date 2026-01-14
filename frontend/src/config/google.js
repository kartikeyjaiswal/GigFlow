// Google OAuth Configuration
// Get Client ID from environment variable
// If not set, use a placeholder (won't work for actual Google auth)
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'placeholder';

// Steps to get your Client ID:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project
// 3. Go to APIs & Services > OAuth consent screen
// 4. Configure consent screen (fill in required fields)
// 5. Go to Credentials > Create OAuth 2.0 Client ID
// 6. Select "Web application"
// 7. Add authorized JavaScript origins:
//    - http://localhost:5173
//    - http://localhost:5000
// 8. Copy your Client ID and add to .env.local:
//    VITE_GOOGLE_CLIENT_ID=your_client_id_here
