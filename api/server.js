import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the EstateCore API' });
});

import propertyRoutes from './routes/properties.js';
import userRoutes from './routes/users.js';
import buyRequestRoutes from './routes/buyRequests.js';
import reviewRoutes from './routes/reviews.js';
import visitRoutes from './routes/visits.js';
import messageRoutes from './routes/messages.js';

app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/buy-requests', buyRequestRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
