const crypto = require('crypto');

// Generate a random JWT secret
const generateJWTSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // 32 bytes for HMAC-SHA256
}