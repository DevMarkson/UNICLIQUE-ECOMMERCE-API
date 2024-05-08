const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    validate:{
        validator: validator.isEmail,
        message: 'Please provide valid email'
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please prove a number'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare the provided password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch =  await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);