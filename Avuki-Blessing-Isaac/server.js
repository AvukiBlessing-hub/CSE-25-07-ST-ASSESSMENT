const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// --- CONFIGURATION ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES ---
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes); // all routes (/, /login, /signup)

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Signup: http://localhost:${PORT}/signup`);
  console.log(`Login: http://localhost:${PORT}/login`);
});
