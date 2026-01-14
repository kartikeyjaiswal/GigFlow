# GigFlow Frontend Testing Workflow

## Prerequisites
- Backend API running on `http://localhost:5000`
- Frontend running on `http://localhost:5173`
- Environment variables configured in `.env`

## Test Scenarios

### 1. User Registration ✅
**Objective**: Create a new user account

**Steps**:
1. Navigate to `http://localhost:5173/register`
2. Enter:
   - Name: "Test User"
   - Email: "testuser@example.com"
   - Password: "password123"
3. Click "Sign up"

**Expected Result**:
- No errors
- Redirect to home page
- "Welcome, Test User" in navbar
- "Post a Gig" button visible

**Files Involved**:
- `src/pages/Register.jsx`
- `src/context/AuthContext.jsx`

---

### 2. User Login ✅
**Objective**: Login with existing credentials

**Steps**:
1. Logout if already logged in
2. Navigate to `http://localhost:5173/login`
3. Enter:
   - Email: "testuser@example.com"
   - Password: "password123"
4. Click "Sign in"

**Expected Result**:
- No errors
- Redirect to home page
- User info displayed in navbar
- Session persists on page refresh

**Files Involved**:
- `src/pages/Login.jsx`
- `src/context/AuthContext.jsx`

---

### 3. Browse Gigs ✅
**Objective**: View available gigs

**Steps**:
1. Login (or stay logged in)
2. Navigate to home page `/`
3. View gig listings

**Expected Result**:
- Gigs display in a 3-column grid
- Each gig shows: title, description, budget, owner
- "View Details" button on each gig
- Responsive on mobile (1 column)

**Files Involved**:
- `src/pages/Home.jsx`
- `src/components/GigCard.jsx`

---

### 4. Search Gigs ✅
**Objective**: Find specific gigs

**Steps**:
1. On home page, see search box
2. Type a gig title (e.g., "React")
3. Click "Search" button
4. View filtered results
5. Click "Clear" to reset

**Expected Result**:
- Results filtered by title
- "Found X gigs" message
- Clear button appears when searching
- No gigs message if no matches

**Files Involved**:
- `src/pages/Home.jsx`

---

### 5. Create a Gig ✅
**Objective**: Post a new job

**Steps**:
1. Login as a user
2. Click "Post a Gig" button
3. Fill form:
   - Title: "Build a React Dashboard"
   - Description: "I need a dashboard with charts and analytics..."
   - Budget: "500"
4. Click "Post Gig"

**Expected Result**:
- Gig created successfully
- Redirect to gig detail page
- Gig status shows "Open"
- User is listed as owner

**Files Involved**:
- `src/pages/CreateGig.jsx`
- `src/context/AuthContext.jsx`

---

### 6. View Gig Details ✅
**Objective**: See complete gig information

**Steps**:
1. Click on any gig from home page
2. View full details page

**Expected Result**:
- Full title, description, budget displayed
- Owner name shown
- Status badge (Open/Assigned)
- "Back to Gigs" link available
- Appropriate bid section shown (based on ownership)

**Files Involved**:
- `src/pages/GigDetail.jsx`
- `src/components/BidList.jsx`

---

### 7. Submit a Bid ✅
**Objective**: Apply for a gig as freelancer

**Prerequisites**: Must be logged in as a different user than gig owner

**Steps**:
1. View gig detail page (as freelancer)
2. Click "Submit a Bid" button
3. Fill:
   - Price: "450"
   - Message: "I have 5+ years of React experience..."
4. Click "Submit Bid"

**Expected Result**:
- Success alert appears
- Bid submitted
- Form closes
- Gig detail refreshes

**Files Involved**:
- `src/pages/GigDetail.jsx`
- `src/components/BidList.jsx`

---

### 8. Review Bids (As Owner) ✅
**Objective**: View all bids on own gig

**Prerequisites**: Must be logged in as gig owner

**Steps**:
1. Navigate to own gig
2. View "Bids" section at bottom
3. See all submitted bids

**Expected Result**:
- Shows count of bids
- Each bid displays:
  - Freelancer name and email
  - Bid price
  - Pitch message
  - Status badge ("pending")
  - "Hire" button if pending

**Files Involved**:
- `src/pages/GigDetail.jsx`
- `src/components/BidList.jsx`

---

### 9. Hire a Freelancer ✅
**Objective**: Select winning bid

**Prerequisites**: Must be gig owner with pending bids

**Steps**:
1. View own gig with bids
2. Click "Hire" button on desired bid
3. Confirm dialog: "Are you sure..."
4. Click confirm

**Expected Result**:
- Selected bid status changes to "hired" (green)
- Gig status changes to "Assigned"
- Other bids change to "rejected" (red)
- Success alert appears
- Page refreshes with updates

**Files Involved**:
- `src/pages/GigDetail.jsx`
- `src/components/BidList.jsx`
- Backend: `PATCH /api/bids/:bidId/hire`

---

### 10. Real-time Notification ✅
**Objective**: Receive notification when hired

**Prerequisites**: 
- Have another browser/tab with freelancer logged in
- That freelancer has pending bids

**Steps**:
1. Have freelancer's tab open to home/any page
2. As gig owner, hire that freelancer
3. Watch freelancer's tab

**Expected Result**:
- Green toast notification appears top-right
- Shows: "You have been hired for [Project Name]!"
- Auto-dismisses after 10 seconds
- Can manually close with X button
- No page refresh needed

**Files Involved**:
- `src/context/SocketContext.jsx`
- `src/components/Notification.jsx`

---

### 11. Session Persistence ✅
**Objective**: Verify session survives page refresh

**Steps**:
1. Login
2. Verify navbar shows user
3. Refresh page (F5)
4. Check if still logged in

**Expected Result**:
- User still logged in
- Session maintained
- No need to re-login
- User context restored

**Files Involved**:
- `src/context/AuthContext.jsx`
- Axios credentials configuration

---

### 12. Protected Routes ✅
**Objective**: Verify unauthenticated users can't access protected pages

**Steps**:
1. Logout
2. Try to navigate to `/create-gig`
3. Try to access `/create-gig` directly via URL

**Expected Result**:
- Redirect to `/login`
- Cannot access protected pages
- All gig/bid operations restricted

**Files Involved**:
- `src/components/ProtectedRoute.jsx`
- `src/App.jsx`

---

### 13. Form Validation ✅
**Objective**: Verify forms prevent invalid submissions

**Steps**:

**Register Form**:
1. Try submit with empty fields
2. Try invalid email
3. Try password < 6 characters

**Gig Creation Form**:
1. Try empty title
2. Try empty description
3. Try budget = 0 or negative

**Bid Form**:
1. Try empty message
2. Try empty price

**Expected Result**:
- All invalid submissions blocked
- Error messages shown
- Form won't submit
- User guidance provided

**Files Involved**:
- Various page components
- Client-side validation only

---

### 14. Error Handling ✅
**Objective**: Verify graceful error handling

**Steps**:
1. Try login with wrong password
2. Try register with existing email
3. Try create gig with invalid data
4. Disconnect API and try request

**Expected Result**:
- Error messages displayed
- User-friendly error text
- No app crashes
- Can retry operations
- Error boundary catches React errors

**Files Involved**:
- `src/components/ErrorBoundary.jsx`
- All page components
- API service

---

### 15. Responsive Design ✅
**Objective**: Verify mobile responsiveness

**Steps**:
1. Open app on phone or use browser dev tools
2. Test all pages at different sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
3. Test touch interactions
4. Test navigation

**Expected Result**:
- All content visible
- Buttons easily tappable
- No horizontal scrolling
- Grid adapts to screen size
- Text readable
- Images scale properly

**Files Involved**:
- All components (Tailwind responsive classes)
- `tailwind.config.js`

---

## Performance Testing

### 1. Load Time ✅
**Steps**:
1. Open DevTools Network tab
2. Hard refresh (Ctrl+Shift+R)
3. Check load time

**Expected**: < 3 seconds for initial load

### 2. Search Performance ✅
**Steps**:
1. Search for gigs
2. Check response time

**Expected**: < 500ms for search results

### 3. Image Loading ✅
**Steps**:
1. Check Network tab
2. Verify no broken images

---

## Security Testing

### 1. Cookie Verification ✅
**Steps**:
1. Login
2. Open DevTools > Application > Cookies
3. Look for JWT cookie

**Expected**: 
- HttpOnly cookie present
- Secure flag set (on HTTPS)
- SameSite policy set

### 2. Protected Data ✅
**Steps**:
1. Logout
2. Try accessing API directly via Network tab
3. Try accessing protected endpoints

**Expected**: 401 Unauthorized responses

---

## Bug Checklist

- [ ] All buttons work
- [ ] All forms validate
- [ ] All API calls succeed
- [ ] No console errors
- [ ] No broken images
- [ ] No layout issues
- [ ] Responsive on all sizes
- [ ] Notifications work
- [ ] Session persists
- [ ] Protected routes work
- [ ] Search filters work
- [ ] Status updates work
- [ ] Bid list updates work
- [ ] Hiring updates work

---

## Deployment Testing

Before deploying to production:

1. **Build Successfully**
   ```bash
   npm run build
   ```
   - Check for errors
   - Verify dist/ folder created

2. **Test Production Build**
   ```bash
   npm run preview
   ```
   - Navigate through all pages
   - Test all features
   - Check console for errors

3. **Environment Variables**
   - [ ] VITE_API_URL set to production backend
   - [ ] VITE_SOCKET_URL set correctly
   - [ ] No localhost URLs in production

4. **Final Check**
   - [ ] All pages load
   - [ ] Auth works
   - [ ] API calls succeed
   - [ ] Notifications work
   - [ ] No errors in console

---

## Notes

- All tests assume backend is properly implemented
- Backend must handle CORS properly
- Backend must set HttpOnly cookies
- Socket.io must be configured on backend
- All dates in this document are for reference only

---

**Testing Priority**: 
1. Critical: Auth, Gig creation, Hiring, Notifications
2. Important: Search, Browse, Validation
3. Nice to have: Performance, Security details

---
