const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Gemini routing for analytics (Protected)
router.post('/insights', auth, async (req, res) => {
  try {
    const { activities } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
      return res.status(503).json({ message: "Gemini API key not configured." });
    }

    if (!activities || activities.length === 0) {
      return res.status(400).json({ message: "No activities provided for analysis." });
    }

    // Get user details for personalization
    const user = await User.findById(req.user.userId);
    const username = user ? user.username : 'User';

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Trying gemini-pro as gemini-2.0-flash seems to have quota issues (limit: 0)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      You are an expert AI fitness coach. Analyze the following recent workout activities for your client named "${username}".
      Provide a short, highly encouraging, and actionable insight (max 3-4 sentences) to help ${username} improve or stay motivated.
      Speak directly to them using their name.
      Activities: ${JSON.stringify(activities)}
      Generate a weekly fitness plan including:
      - cardio
      - strength
      - rest day
      - nutrition tip
    `;

    console.log(`[AI] Generating insights for ${username} using gemini-1.5-flash...`);
    if (mongoose.connection.readyState !== 1) {
      console.log(`[AI DB WARNING] State: ${mongoose.connection.readyState}`);
    }
const result = await model.generateContent({
  contents: [{ role: "user", parts: [{ text: prompt }] }]
});

const text = result.response.text();

    console.log(`[AI] Successfully generated insights.`);
    res.json({ insights: text });
  } catch (error) {
    console.error("AI Insights Error:", error.message);
    if (error.response) {
      console.error("AI Error Details:", JSON.stringify(error.response, null, 2));
    }
    res.status(500).json({ message: "Failed to generate AI insights." });
  }
});

module.exports = router;
