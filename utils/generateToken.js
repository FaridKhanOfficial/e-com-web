const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email }, // Payload
        process.env.JWT_SECRET || 'defaultsecret', // Secret key
        { expiresIn: '1h' } // Expiration time
    );
}

module.exports = { generateToken };
