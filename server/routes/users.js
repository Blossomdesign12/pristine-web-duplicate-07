
const express = require('express');
const router = express.Router();
const {
  getAllAgents,
  getUserById,
  updateProfile,
  changePassword,
  getAgentProperties,
  getDashboardData
} = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Get all agents - accessible to everyone
router.get('/agents', getAllAgents);

// Get user by ID - accessible to everyone
router.get('/:id', getUserById);

// Get properties by agent - accessible to everyone
router.get('/:id/properties', getAgentProperties);

// Get dashboard data - requires authentication
router.get('/dashboard/data', authenticate, getDashboardData);

// Update profile - requires authentication
router.put('/profile', authenticate, updateProfile);

// Change password - requires authentication
router.put('/password', authenticate, changePassword);

module.exports = router;
