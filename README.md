# GigFlow - Freelance Marketplace Platform

GigFlow is a mini-freelance marketplace platform where Clients can post jobs (Gigs) and Freelancers can apply for them (Bids). The platform features secure authentication, real-time notifications, and atomic transaction handling to prevent race conditions.

## 🚀 Features

### Core Features
- **User Authentication**: Secure sign-up and login with JWT tokens stored in HttpOnly cookies
- **Gig Management**: Browse, search, and create job postings (Gigs)
- **Bidding System**: Freelancers can submit bids on open gigs
- **Hiring Logic**: Clients can hire freelancers with atomic updates that prevent race conditions
- **Real-time Notifications**: Socket.io integration for instant notifications when hired

### Bonus Features
- ✅ **Transactional Integrity**: MongoDB transactions prevent race conditions when multiple clients try to hire simultaneously
- ✅ **Real-time Updates**: Socket.io integration for instant notifications when a freelancer is hired

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MongoDB (via Mongoose)
- JWT authentication with HttpOnly cookies
- Socket.io for real-time communication
- MongoDB Transactions for atomic updates

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router for navigation
- Context API for state management
- Axios for API calls
- Socket.io-client for real-time updates

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

## 🔧 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (sets HttpOnly cookie)
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Fetch all open gigs (supports `?search=query` parameter)
- `GET /api/gigs/:id` - Get a single gig by ID
- `POST /api/gigs` - Create a new gig (requires authentication)

### Bids
- `POST /api/bids` - Submit a bid for a gig (requires authentication)
- `GET /api/bids/:gigId` - Get all bids for a specific gig (owner only)
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (owner only, uses MongoDB transactions)

## 🗄️ Database Schema

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Gig
```javascript
{
  title: String (required),
  description: String (required),
  budget: Number (required),
  ownerId: ObjectId (ref: User),
  status: String (enum: ['open', 'assigned'], default: 'open'),
  createdAt: Date,
  updatedAt: Date
}
```

### Bid
```javascript
{
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  message: String (required),
  price: Number (required),
  status: String (enum: ['pending', 'hired', 'rejected'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- Password hashing using bcryptjs
- JWT tokens stored in HttpOnly cookies (prevents XSS attacks)
- CORS configuration for secure cross-origin requests
- Input validation and sanitization
- Authentication middleware for protected routes

## ⚡ Transactional Integrity (Bonus Feature)

The hiring process uses MongoDB transactions to ensure atomicity:

1. When a client clicks "Hire" on a bid:
   - The gig status changes from 'open' to 'assigned'
   - The selected bid status becomes 'hired'
   - All other bids for that gig are marked as 'rejected'

2. All these operations happen atomically in a single transaction
3. If two clients try to hire simultaneously, only one transaction will succeed

## 🔔 Real-time Notifications (Bonus Feature)

- **Socket.io integration** provides real-time notifications
- **Hired Event**: Freelancers get a green success notification when hired
- **Rejected Event**: Freelancers get a red error notification when their bid is rejected
- No page refresh required - notifications appear in real-time

## 🛑 Bid Rejection Feature

- **Explicit Rejection**: Clients can now actively reject bids they don't want.
- **Immediate Feedback**: Rejection updates the database and notifies the freelancer instantly.

## 📝 Usage

1. **Register/Login**: Create an account or login to existing account
2. **Browse Gigs**: View all open gigs on the homepage
3. **Search**: Use the search bar to find gigs by title
4. **Post a Gig**: Click "Create Gig" to create a new job posting
5. **Submit Bids**: View gig details and submit bids as a freelancer
6. **Hire/Reject**: As a gig owner, manage bids by hiring or rejecting freelancers
7. **Real-time Updates**: Receive instant notifications for status changes

## 🧪 Testing and Verification

This project includes a robust testing suite to ensure the integrity of critical features like hiring and transactions.

### Running Automated Tests
The backend includes Jest tests to verify authentication and race condition handling.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the test suite:
   ```bash
   npm test
   ```

### What is Tested?
- **Authentication Flows**: Registration and Login.
- **Bidding Logic**: Successful bid placement.
- **Race Condition Handling**: Simulates concurrent hire requests to ensure only one freelancer can be hired for a gig, maintaining data integrity even under high load.
- **Replica Set Compatibility**: Tests are designed to handle both standard and Replica Set MongoDB environments gracefully.

