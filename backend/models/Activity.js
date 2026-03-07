const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'HIIT', 'Other']
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  calories: {
    type: Number,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  },
  aiInsights: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
