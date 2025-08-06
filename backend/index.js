import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: '✅ This is the ACTIVE server instance!' });
});

// Render health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: '✅ API is healthy!' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/results', resultRoutes);

// Fallback for unknown routes
app.use((req, res, next) => {
  res.status(404);
  res.type('application/json');
  res.json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});