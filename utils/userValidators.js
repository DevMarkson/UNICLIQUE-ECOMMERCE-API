const validator = require('validator');

exports.validateEmail = (email) => {
  // Check if the email ends with @gmail.com or @stu.ui.edu.ng
  const emailPattern = /^[a-zA-Z].*@(gmail\.com|stu\.ui\.edu\.ng)$/;
  if (!emailPattern.test(email)) {
    return false;
  }

  // Check if the email starts with an alphabet
  if (!/^[a-zA-Z]/.test(email)) {
    return false;
  }

  // Check if the email contains at least 3 digits
  const digitCount = email.match(/\d/g)?.length || 0;
  if (digitCount < 3) {
    return false;
  }

  // Additional email validation using the validator library
  return validator.isEmail(email);
};

exports.validatePassword = (password) => {
  // Password validation rules
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
  return passwordRegex.test(password);
};