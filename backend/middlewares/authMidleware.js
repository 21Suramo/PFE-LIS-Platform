const jwt = require('jsonwebtoken');
const User = require('../modules/user');

const JWT_SECRET = process.env.JWT_SECRET || 'YourDevFallbackSecret';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; // ✅ Attach full user for role, id, name, etc.
      return next();   // ✅ Allow route access
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  }

  // No token at all
  return res.status(401).json({ message: 'Not authorized, no token provided' });
};

module.exports = protect;
