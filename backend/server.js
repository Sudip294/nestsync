import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import webpush from 'web-push';

import authRoutes from './routes/authRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import userRoutes from './routes/userRoutes.js';

webpush.setVapidDetails(
  'mailto:sudiphero294@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://nestsync-portal.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Pass socket.io reference to express controllers
app.set('socketio', io);

// Middleware
app.use(cors({
  origin: ['https://nestsync-portal.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
}));

// Rate Limiter disabled for dev
// const limiter = rateLimit({ ... });
// app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Society Management System API is running...');
});

// Socket.io JWT Authentication Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error('Authentication error: Invalid token'));
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id, 'User ID:', socket.user?.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/society-management';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
