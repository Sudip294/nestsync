# Society Management System

A full-stack, responsive, Progressive Web App (PWA) built for Indian co-op housing societies. It features real-time socket updates, glassmorphism UI, secure role-based access, and modern animations.

## Features Included
- **Dark/Light Mode:** Premium responsive glassmorphism UI using Tailwind CSS and Framer Motion.
- **Role-Based Access:** Separate dashboards for Admins (manage everything) and Residents (view/pay/raise complaints).
- **Notices Board:** Admins can broadcast announcements.
- **Maintenance Tracking:** Track monthly billing with clear pending/paid statuses.
- **Real-Time Complaints:** File issues that update instantly via Socket.io without page refreshes.
- **PWA Ready:** Installable on mobile devices with an optimized bottom navigation bar.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS v3, Framer Motion, Socket.io-client, Axios.
- **Backend:** Node.js, Express.js, MongoDB, Socket.io, JWT, Resend API.
- **Security:** Helmet, Express-Rate-Limit, bcrypt password hashing.

---

## How to Run Locally

### 1. Configure Environment Variables
Navigate to the `backend` folder and open the `.env` file. You need to provide your API keys there:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/society-management
JWT_SECRET=your_super_secret_jwt_key_here
RESEND_API_KEY=your_resend_api_key_here
```
*(Make sure MongoDB is installed and running locally on port 27017, or replace the URI with your MongoDB Atlas cloud URI).*

### 2. Start the Backend
Open a terminal and run:
```bash
cd backend
npm install
npm run start
```
*(You can also use `npx nodemon server.js` for development mode).*

### 3. Start the Frontend
Open a new terminal window and run:
```bash
cd frontend
npm install
npm run dev
```

### 4. Open in Browser
Visit `http://localhost:5173` to see your beautiful new Society Management App!

---
## Default Testing Flow
1. Register a new user and select the **Admin** role.
2. Log out, then register another user and select the **Resident** role (e.g. Flat A-402).
3. Log in as the Resident, go to the Complaints portal, and file a new complaint.
4. Log in as the Admin on another browser window, view the complaint, and mark it as "In Progress". Watch it update in real-time on the Resident's screen!
