
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
} = require("../controllers/propertyController");

// Public routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Protected routes
router.post("/", protect, createProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);
router.get("/user/me", protect, getUserProperties);

module.exports = router;
