const User = require('../models/User');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors');
const { validateEmail, validatePassword } = require('../utils/userValidators');
// const { errorHandler } = require('../utils/errorHandler');
// const redisClient = require('../utils/redis');

// Authenticate a user and generate a JWT
exports.authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Verify the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Generate a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Cachingin Redis
    // await redisClient.setex(`auth_${user.id}`, 3600, token);
    
     // Respond with the welcome message
     res.json({ msg: `Welcome back, ${user.firstName}`, token });
  } catch (err) {
    next(err);
  }
};

// Register a new user
exports.registerUser = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    // Validate input
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidConfirmPassword = validatePassword(confirmPassword);

    if (!isValidEmail || !isValidPassword || !isValidConfirmPassword) {
      return res.status(400).json({ msg: 'Invalid input' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    // Save the new user
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};