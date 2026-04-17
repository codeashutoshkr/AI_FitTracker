const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
console.log("ENV CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
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

// OAuth2.O
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    //  Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    //  Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        profilePic: picture,
      });
    }

    // 🔑 Create JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 📤 Send response
    res.json({
      user,
      token: jwtToken,
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
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
