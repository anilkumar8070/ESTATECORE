import express from 'express';
import Visit from '../models/Visit.js';

const router = express.Router();

// GET all visits
router.get('/', async (req, res) => {
  try {
    const visits = await Visit.find().populate('propertyId').populate('userId', 'name email');
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new visit
router.post('/', async (req, res) => {
  const visit = new Visit(req.body);
  try {
    const newVisit = await visit.save();
    res.status(201).json(newVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update visit
router.put('/:id', async (req, res) => {
  try {
    const updatedVisit = await Visit.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' }).populate('propertyId').populate('userId', 'name email');
    if (!updatedVisit) return res.status(404).json({ message: 'Visit not found' });
    res.json(updatedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE visit
router.delete('/:id', async (req, res) => {
  try {
    const deletedVisit = await Visit.findByIdAndDelete(req.params.id);
    if (!deletedVisit) return res.status(404).json({ message: 'Visit not found' });
    res.json({ message: 'Visit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
