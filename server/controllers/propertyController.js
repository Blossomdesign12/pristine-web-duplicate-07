
const Property = require("../models/Property");

// @desc    Get all properties
// @route   GET /properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    let query = {};
    
    // Apply status filter if provided
    if (req.query.status) {
      query["features.status"] = req.query.status;
    }
    
    const properties = await Property.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get properties error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get property by ID
// @route   GET /properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    
    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("Get property error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create a new property
// @route   POST /properties
// @access  Private (Only agents and owners)
exports.createProperty = async (req, res) => {
  try {
    // Check if user is agent or owner
    if (req.user.role !== "agent" && req.user.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Only agents and property owners can create property listings",
      });
    }
    
    // Add user ID to property
    const propertyData = {
      ...req.body,
      user: req.user.id,
      agent: {
        id: req.user.id,
        name: req.user.name,
        phone: req.user.phone || "Not provided",
        email: req.user.email,
        image: req.user.avatar || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      },
    };
    
    const property = await Property.create(propertyData);
    
    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Create property error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update property
// @route   PUT /properties/:id
// @access  Private (Only property owner, agent, or admin)
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    
    // Check ownership or admin role
    if (
      property.user.toString() !== req.user.id &&
      req.user.role !== "admin" &&
      property.agent.id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this property",
      });
    }
    
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Update property error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete property
// @route   DELETE /properties/:id
// @access  Private (Only property owner, agent, or admin)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    
    // Check ownership or admin role
    if (
      property.user.toString() !== req.user.id &&
      req.user.role !== "admin" &&
      property.agent.id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this property",
      });
    }
    
    await property.deleteOne();
    
    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get properties by user
// @route   GET /properties/user
// @access  Private
exports.getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get user properties error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
