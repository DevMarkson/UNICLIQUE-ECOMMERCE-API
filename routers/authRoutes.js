const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {registerUser, authenticateUser} = require('../controllers/auth');

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to all requests
router.use(limiter);


router.post('/login', authenticateUser)
    .get('/login', (req,res) => {
  res.send("HELLO LOGIN");
});



router.post('/register', registerUser);
router.get('/register', (req,res) => {
  res.send("HELLO REGISTER");
});

module.exports = router;