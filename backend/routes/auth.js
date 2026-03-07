const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '7d' });

    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        weeklyGoal: user.weeklyGoal,
        preferences: user.preferences
      } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        weeklyGoal: user.weeklyGoal,
        preferences: user.preferences
      } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile (Protected)
router.put('/profile', auth, async (req, res) => {
  try {
    const { weeklyGoal, preferences } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (weeklyGoal !== undefined) user.weeklyGoal = weeklyGoal;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();
    res.json({ 
      message: 'Profile updated', 
      user: { 
        id: user._id, 
        username: user.username, 
        weeklyGoal: user.weeklyGoal,
        preferences: user.preferences
      } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
