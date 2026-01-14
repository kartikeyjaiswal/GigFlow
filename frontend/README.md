# GigFlow Frontend

A modern React-based frontend for the GigFlow freelance marketplace platform. Built with React 19, Vite, Tailwind CSS, and Socket.io for real-time notifications.

## Features

### User Authentication
- Secure sign-up and login system
- JWT-based authentication with HttpOnly cookies
- Persistent user sessions
- Role-flexible system (users can be both clients and freelancers)

### Gig Management
- **Browse Gigs**: View all open gigs in a responsive grid layout
- **Search/Filter**: Search for gigs by title
- **Create Gigs**: Post new jobs with title, description, and budget
- **Gig Details**: View comprehensive gig information and manage bids

### Bidding System
- **Submit Bids**: Freelancers can submit bids with a price and pitch message
- **Review Bids**: Gig owners can view all bids for their gigs
- **Hire Freelancer**: Select the best freelancer to work on a gig
- **Bid Status Tracking**: Track bid statuses (pending, hired, rejected)

### Real-time Notifications
- Socket.io integration for instant notifications
- Receive real-time alerts when hired for a gig
- Auto-dismissing toast notifications
- Toast persists for 10 seconds with manual dismiss option

### User Interface
- Clean, modern design using Tailwind CSS
- Responsive layout (mobile, tablet, desktop)
- Loading spinners for better UX
- Error boundaries for graceful error handling
- Form validation with helpful error messages

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Autoprefixer + PostCSS
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.io
- **Routing**: React Router DOM v7
- **Linting**: ESLint

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

## Development

### Start Development Server
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` directory

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── BidList.jsx      # Display bids component
│   │   ├── ErrorBoundary.jsx # Error handling wrapper
│   │   ├── GigCard.jsx      # Individual gig card
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Notification.jsx # Toast notification
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── config/
│   │   └── api.js           # Axios configuration
│   ├── context/             # React Context API
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── SocketContext.jsx # WebSocket state
│   ├── pages/               # Page components
│   │   ├── CreateGig.jsx    # Create gig form
│   │   ├── GigDetail.jsx    # Gig detail + bidding
│   │   ├── Home.jsx         # Gig listing
│   │   ├── Login.jsx        # Login page
│   │   └── Register.jsx     # Registration page
│   ├── services/
│   │   └── apiService.js    # API endpoint functions
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.jsx             # React DOM entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env.example            # Environment template
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Dependencies and scripts
```

## Key Components

### AuthContext
Manages user authentication state and provides methods for:
- User registration
- User login
- User logout
- Authentication check on app load

### SocketContext
Manages WebSocket connections and provides:
- Real-time notification handling
- Socket connection lifecycle
- Notification dismissal

### API Service
Organized API calls for:
- Authentication (`register`, `login`, `logout`, `getMe`)
- Gigs (`getAll`, `getById`, `create`, `update`)
- Bids (`submit`, `getByGig`, `hire`)

### Utility Functions
Helper functions for:
- Currency formatting
- Date formatting
- Text truncation
- Email/password validation
- Status badge styling

## API Integration

The frontend connects to the backend API with the following endpoints:

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Get all open gigs (with optional search)
- `GET /api/gigs/:id` - Get gig details
- `POST /api/gigs` - Create new gig

### Bids
- `POST /api/bids` - Submit a bid
- `GET /api/bids/:gigId` - Get bids for a gig (owner only)
- `PATCH /api/bids/:bidId/hire` - Hire freelancer

## Real-time Notifications

The frontend listens for Socket.io events:
- `hired` - When a user is hired for a gig
  ```javascript
  {
    userId: "user_id",
    gigId: "gig_id",
    gigTitle: "Project Title",
    message: "You have been hired for Project Title!"
  }
  ```

## Form Validation

All forms include client-side validation:
- **Email**: Standard email format validation
- **Password**: Minimum 6 characters
- **Gig Title**: Required, max 100 characters
- **Description**: Required, max 2000 characters
- **Budget**: Required, must be > 0
- **Bid Price**: Required, must be numeric
- **Pitch Message**: Required, encouraging detailed descriptions

## Error Handling

- Global error boundary for React errors
- Try-catch blocks for async operations
- User-friendly error messages
- Form validation with helpful feedback
- API error handling with fallback messages

## Performance Optimizations

- Lazy route loading with React Router
- Image optimization with Tailwind
- CSS minification with Tailwind
- Responsive images with CSS classes
- Efficient state management with React Context
- Debounced search functionality

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Common Issues

### 1. API Connection Issues
**Problem**: Frontend can't connect to backend
**Solution**: Ensure `VITE_API_URL` in `.env` matches backend URL

### 2. Socket.io Connection Issues
**Problem**: Notifications not working
**Solution**: Verify `VITE_SOCKET_URL` and ensure backend has Socket.io configured

### 3. Authentication Issues
**Problem**: Getting logged out frequently
**Solution**: Ensure backend is setting HttpOnly cookies correctly

### 4. CORS Errors
**Problem**: Cross-origin requests failing
**Solution**: Check backend CORS configuration includes frontend URL

## Contributing

When adding new features:
1. Create new components in `src/components/`
2. Create new pages in `src/pages/`
3. Add new API calls in `src/services/apiService.js`
4. Follow the existing code style
5. Test all forms and API integrations
6. Update this README if adding major features

## Deployment

### Build Steps
```bash
npm run build
```

### Deploy to Services
- **Vercel**: Connect GitHub repo, select `frontend` as root
- **Netlify**: Upload `dist` folder or connect GitHub
- **AWS S3 + CloudFront**: Upload `dist` contents to S3
- **Any Static Host**: Upload `dist` folder contents

## License

This project is part of the GigFlow platform.

## Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Include browser console errors if applicable
- Attach relevant screenshots
