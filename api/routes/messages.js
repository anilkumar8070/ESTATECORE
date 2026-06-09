import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Get messages for a specific user and property
router.get('/', async (req, res) => {
  try {
    const { userId, propertyId } = req.query;
    if (!userId || !propertyId) {
      return res.status(400).json({ message: 'userId and propertyId are required' });
    }
    const messages = await Message.find({ userId, propertyId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new message
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
