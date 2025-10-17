const express = require('express');
const router = express.Router();

// --- SIMULATED DATABASE ---
const users = new Map(); // Store users: email -> {name, phone, password}

// --- UTILITY FUNCTIONS ---
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidPhone = (phone) => /^\+\d{10,15}$/.test(phone);
const isStrongPassword = (password) => password.length >= 8;

// --- ROUTES ---

// Default route
router.get('/', (req, res) => res.redirect('/login'));

// GET /signup
router.get('/signup', (req, res) => {
  res.render('signup', {
    success: req.query.success === 'true',
    error: req.query.error || null,
    formData: {}
  });
});

// POST /signup
router.post('/signup', (req, res) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;
  let errors = {};

  // Validation Checks
  if (!fullName) errors.fullName = 'Full Name is required.';
  if (!isValidEmail(email)) errors.email = 'Invalid email format.';
  if (!isValidPhone(phone))
    errors.phone = 'Phone must start with + and include country code (e.g., +256...).';
  if (!isStrongPassword(password))
    errors.password = 'Password must be at least 8 characters.';
  if (password !== confirmPassword)
    errors.confirmPassword = 'Passwords do not match.';
  if (users.has(email)) errors.email = 'This email is already registered.';

  if (Object.keys(errors).length > 0) {
    return res.render('signup', {
      errors,
      formData: req.body,
      error: 'Please fix the errors below.'
    });
  }

  // Save user
  users.set(email, { fullName, phone, password });
  console.log(`New user registered: ${fullName} (${email})`);

  res.redirect('/signup?success=true');
});

// GET /login
router.get('/login', (req, res) => {
  res.render('login', {
    error: req.query.error || null,
    formData: {},
    isSuccess: req.query.success === 'true'
  });
});

// POST /login
router.post('/login', (req, res) => {
  const { identifier, password } = req.body;
  let errors = {};
  let user = users.get(identifier);

  // Try finding user by phone if not found by email
  if (!user) {
    for (const [key, value] of users.entries()) {
      if (value.phone === identifier) {
        user = value;
        break;
      }
    }
  }

  // Validation
  if (!identifier) errors.identifier = 'Email or Phone Number is required.';
  if (!password) errors.password = 'Password is required.';

  if (Object.keys(errors).length > 0) {
    return res.render('login', {
      errors,
      formData: req.body,
      error: 'Please enter both fields.'
    });
  }

  // Authentication
  if (!user || user.password !== password) {
    errors.identifier = 'Invalid credentials.';
    errors.password = 'Invalid credentials.';
    return res.render('login', {
      errors,
      formData: req.body,
      error: 'Invalid Email/Phone or Password.'
    });
  }

  console.log(`User logged in: ${user.fullName}`);
  res.send(`
    <h1>Welcome, ${user.fullName}!</h1>
    <p>You are successfully logged in.</p>
    <p><a href="/login">Logout</a></p>
  `);
});

module.exports = router;
