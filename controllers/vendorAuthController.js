const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const { validateEmail } = require('../utils/vendorValidators');

// Vendor signup
exports.vendorSignup = async (req, res) => {
  try {
    const {
      businessName,
      businessDescription,
      lastName,
      firstName,
      phoneNumber,
      email,
      password,
      category,
    } = req.body;

   // Validate the email
   const isValidEmail = validateEmail(email);
   if (!isValidEmail) {
     return res.status(400).json({ error: 'Invalid email format' });
   } 

    // Check if the vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ error: 'Vendor already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Combine lastName and firstName
    const ownerName = `${lastName} ${firstName}`;

    // Create a new vendor document
    const newVendor = new Vendor({
      businessName,
      businessDescription,
      ownerName,
      phoneNumber,
      email,
      password: hashedPassword,
      category,
      isVerified: false,
    });

    // Save the vendor data to the database
    await newVendor.save();

    // Send verification email
    sendVerificationEmail(email, businessName, ownerName);

    res.status(200).json({ message: 'Vendor registered successfully. Please verify your email.' });
  } catch (error) {
    console.error('Error registering vendor:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Vendor login
exports.vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the vendor by email
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the vendor is verified
    if (!vendor.isVerified) {
      return res.status(400).json({ error: 'Please verify your email' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in vendor:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Delete a vendor by business name
exports.deleteVendor= async (req, res) => {
  try {
    const { businessName } = req.params;

    // Check if the vendor exists
    const vendor = await Vendor.findOne({ businessName });
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Delete the vendor
    await Vendor.deleteOne({ businessName });

    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};