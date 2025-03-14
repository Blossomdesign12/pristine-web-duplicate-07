
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate token
exports.authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jugyahjwtsecret');
    
    // Find user by id
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check admin role
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin role required' });
  }
  next();
};

// Middleware to check if user is owner or agent
exports.isOwnerOrAgent = (req, res, next) => {
  if (req.user.role !== 'owner' && req.user.role !== 'agent' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Owner or Agent role required' });
  }
  next();
};
