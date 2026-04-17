const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    unique: true,
    sparse: true,   // allows null values
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    minlength: 6
  },

  // For Google login
  email: {
    type: String,
    unique: true,
    sparse: true   // important for Google users
  },
  name: String,
  profilePic: String,

  // Optional: track login method 
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  weeklyGoal: {
    type: Number,
    default: 300
  },
  preferences: {
    theme: { type: String, default: 'dark' },
    unit: { type: String, default: 'km' }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
