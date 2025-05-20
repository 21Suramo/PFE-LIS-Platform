const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'superAdmin') {
    next(); // Authorized
  } else {
    res.status(403).json({ message: 'Access denied. Super Admins only.' });
  }
};

module.exports = isSuperAdmin;
// This middleware checks if the user has the role of 'superAdmin'.
// If the user is a super admin, it calls the next middleware or route handler.