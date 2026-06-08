import express from 'express';
import BuyRequest from '../models/BuyRequest.js';

const router = express.Router();

// GET all buy requests
router.get('/', async (req, res) => {
  try {
    const requests = await BuyRequest.find().populate('propertyId').populate('userId', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new buy request
router.post('/', async (req, res) => {
  const request = new BuyRequest(req.body);
  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update buy request
router.put('/:id', async (req, res) => {
  try {
    const updatedRequest = await BuyRequest.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' }).populate('propertyId').populate('userId', 'name email');
    if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE buy request
router.delete('/:id', async (req, res) => {
  try {
    const deletedRequest = await BuyRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
