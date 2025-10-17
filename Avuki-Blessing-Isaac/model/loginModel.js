const mongoose = require('mongoose');

// --- USER SCHEMA ---
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required.'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters.']
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.']
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      unique: true,
      match: [/^\+\d{10,15}$/, 'Phone must include country code (e.g., +256...)']
    },

    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters.']
    }
  },
  { timestamps: true }
);

// --- HOOK: HASH PASSWORD BEFORE SAVE ---
const bcrypt = require('bcrypt');
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- METHOD: Compare Password ---
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- EXPORT MODEL ---
module.exports = mongoose.model('User', userSchema);
