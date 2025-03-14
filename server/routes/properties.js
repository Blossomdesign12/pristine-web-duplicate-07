
const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getRecentProperties
} = require('../controllers/propertyController');
const { authenticate, isOwnerOrAgent } = require('../middleware/auth');

// Get all properties - accessible to everyone
router.get('/', getAllProperties);

// Get property by ID - accessible to everyone
router.get('/:id', getPropertyById);

// Get featured properties - accessible to everyone
router.get('/featured/list', getFeaturedProperties);

// Get recent properties - accessible to everyone
router.get('/recent/list', getRecentProperties);

// Create property - requires authentication and owner/agent role
router.post('/', authenticate, isOwnerOrAgent, createProperty);

// Update property - requires authentication and ownership or admin
router.put('/:id', authenticate, updateProperty);

// Delete property - requires authentication and ownership or admin
router.delete('/:id', authenticate, deleteProperty);

module.exports = router;
