const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "Please provide a business name"],
  },

  businessDescription: {
    type: String,
    required: [true, 'Please provide a description for the business'],
  },

  ownerName: {
    type: String,
    required: [true, 'Please provide your name'],
  },

  phoneNumber: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },

  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },

  category: {
    type: String,
    required: [true, 'Please provide the category'],
  },

  isVerified: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("Vendor", VendorSchema);
