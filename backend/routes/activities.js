const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');

// GET all activities for a user (Protected)
router.get('/', auth, async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    console.log(`[DB ERROR] 503 - GET /api/activities - State: ${mongoose.connection.readyState}`);
    return res.status(503).json({ message: 'Database is currently offline. Please check your MongoDB Atlas IP whitelist.' });
  }
  try {
    const activities = await Activity.find({ user: req.user.userId }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new activity (Protected)
router.post('/', auth, async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database is currently offline. Please check your MongoDB Atlas IP whitelist.' });
  }
  console.log(`[DEBUG] POST /api/activities - User: ${req.user.userId}`);
  console.log(`[DEBUG] Body:`, req.body);
  
  const { type, duration, calories, date, notes } = req.body;
  
  const activity = new Activity({
    user: req.user.userId,
    type,
    duration,
    calories,
    date: date || new Date(),
    notes
  });

  try {
    const newActivity = await activity.save();
    console.log(`[DEBUG] Activity saved: ${newActivity._id}`);
    res.status(201).json(newActivity);
  } catch (error) {
    console.error(`[DEBUG] Save error:`, error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
