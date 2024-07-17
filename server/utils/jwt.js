const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
        }, 
        secretKey,
        {
            expiresIn: '2h'
        }
    );
};
module.exports = generateToken;