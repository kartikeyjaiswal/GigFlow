# GigFlow Frontend - Quick Start Guide

## ✅ Installation & Setup (5 minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your backend URLs:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 🎯 Core Features Implemented

### User Authentication ✅
- Register new account
- Login with email/password
- Automatic session persistence
- Logout functionality
- Protected routes

### Gig Management ✅
- Browse all open gigs
- Search gigs by title
- Create new gigs
- View gig details
- Track gig status

### Bidding System ✅
- Submit bids with price & message
- View all bids (as gig owner)
- Track bid status
- UI updates on hiring

### Hiring Logic ✅
- Hire freelancer for gig
- Automatic bid status updates
- Gig status changes to "assigned"
- Other bids marked as rejected

### Real-time Notifications ✅
- Socket.io integration
- "You've been hired!" alerts
- Toast notifications
- 10-second auto-dismiss

## 📂 File Structure

```
Frontend: All files ready to use
├── Components: 7 reusable components
├── Pages: 5 full pages
├── Context: 2 context providers
├── Services: API layer
├── Utils: Helper functions
└── Config: Axios setup
```

## 🔌 API Endpoints Expected

The frontend expects these backend endpoints:

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs?search=query` - List gigs
- `GET /api/gigs/:id` - Get gig details
- `POST /api/gigs` - Create gig

### Bids
- `POST /api/bids` - Submit bid
- `GET /api/bids/:gigId` - Get bids (owner only)
- `PATCH /api/bids/:bidId/hire` - Hire freelancer

### Socket.io Events
- Listen for `hired` event to show notifications

## 🎨 Pages Available

1. **Home** (`/`)
   - Browse gigs
   - Search functionality
   - Create gig button

2. **Login** (`/login`)
   - Email/password login
   - Link to register

3. **Register** (`/register`)
   - Name/email/password signup
   - Link to login

4. **Create Gig** (`/create-gig`)
   - Gig form (title, description, budget)
   - Protected route

5. **Gig Detail** (`/gig/:id`)
   - Full gig information
   - Bid submission (freelancers)
   - Bid management (owners)
   - Hire functionality

## 🔐 Security Features

- HttpOnly cookies for auth (set by backend)
- Protected routes requiring login
- Form validation
- Error boundaries
- CORS with credentials

## 🚀 Production Build

```bash
npm run build
# Creates optimized dist/ folder
# Deploy to Vercel, Netlify, AWS S3, etc.
```

## 🐛 Troubleshooting

### API Connection Issues
- Check API URL in .env
- Verify backend is running
- Check CORS headers in backend

### Notifications Not Working
- Verify Socket URL in .env
- Check backend Socket.io setup
- Look at browser console for errors

### Login Issues
- Ensure backend sets HttpOnly cookies
- Check browser Application tab for cookies
- Verify credentials sent correctly

## 📝 Testing the App

### Test Registration
1. Go to `/register`
2. Fill name, email, password
3. Should redirect to `/`
4. Should show welcome message

### Test Gig Creation
1. Login first
2. Click "Post a Gig"
3. Fill title, description, budget
4. Click "Post Gig"
5. Should redirect to gig detail

### Test Bidding
1. View a gig (as different user)
2. Click "Submit a Bid"
3. Enter price and message
4. Click "Submit Bid"
5. Bid should appear in owner's list

### Test Hiring
1. As gig owner, view own gig
2. See all pending bids
3. Click "Hire" on a bid
4. Confirm dialog
5. Should see status change to "hired"
6. Freelancer gets notification

## 📦 Dependencies

- `react@^19.2.0` - UI framework
- `react-router-dom@^7.12.0` - Routing
- `axios@^1.13.2` - HTTP client
- `socket.io-client@^4.8.3` - Real-time comms
- `tailwindcss@^3.4.19` - Styling

## 💾 Important Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app wrapper |
| `src/context/AuthContext.jsx` | Auth state management |
| `src/context/SocketContext.jsx` | Socket.io state |
| `src/pages/Home.jsx` | Gig listing page |
| `src/pages/GigDetail.jsx` | Core hiring logic |
| `src/components/BidList.jsx` | Bid display |
| `src/services/apiService.js` | API calls |
| `.env.example` | Configuration template |

## 🎓 Key Concepts

### Context API
Used for global state:
- Auth state (user, loading)
- Socket state (connection, notifications)

### Protected Routes
Components that check authentication:
- Redirect to login if not authenticated
- Show loading during auth check

### Socket.io
Real-time bidirectional communication:
- Frontend listens for `hired` events
- Shows toast when user hired

### Axios Interceptors
API requests automatically include:
- `withCredentials: true` for cookies
- Proper headers and JSON content-type

## 📞 Getting Help

1. Check `README.md` for detailed docs
2. Review `IMPLEMENTATION.md` for architecture
3. Check browser console (F12) for errors
4. Check network tab to see API requests
5. Review component code comments

## ✨ Next Steps

1. **Ensure backend is running** (port 5000)
2. **Update .env** with correct URLs
3. **Run `npm install`**
4. **Start with `npm run dev`**
5. **Test each feature systematically**
6. **Deploy when ready**

---

Everything is ready! Your GigFlow frontend is fully implemented with:
- ✅ User authentication
- ✅ Gig management
- ✅ Bidding system
- ✅ Hiring logic
- ✅ Real-time notifications
- ✅ Responsive design
- ✅ Error handling
- ✅ Form validation

Start the development server and begin testing! 🚀
