
const Property = require('../models/Property');
const User = require('../models/User');

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const { 
      search, minPrice, maxPrice, bedrooms, 
      bathrooms, propertyType, status, city, 
      featured, limit = 10, page = 1 
    } = req.query;
    
    // Build query
    const query = {};
    
    // Search by title, description, or address
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price filters
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Bedrooms filter
    if (bedrooms) {
      query['features.bedrooms'] = { $gte: Number(bedrooms) };
    }
    
    // Bathrooms filter
    if (bathrooms) {
      query['features.bathrooms'] = { $gte: Number(bathrooms) };
    }
    
    // Property type filter
    if (propertyType) {
      query['features.propertyType'] = propertyType;
    }
    
    // Status filter
    if (status) {
      query['features.status'] = status;
    }
    
    // City filter
    if (city) {
      query['location.city'] = city;
    }
    
    // Featured filter
    if (featured) {
      query.featured = featured === 'true';
    }
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query
    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    // Get total count
    const total = await Property.countDocuments(query);
    
    res.json({
      properties,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Get all properties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    console.error('Get property by ID error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create property
exports.createProperty = async (req, res) => {
  try {
    const {
      title, description, price, location, features, 
      amenities, images, featured
    } = req.body;
    
    // Get user information for agent details
    const user = await User.findById(req.user.id);
    
    // Create property
    const property = new Property({
      title,
      description,
      price,
      location,
      features,
      amenities: amenities || [],
      images: images || [],
      agent: {
        id: user._id,
        name: user.name,
        phone: user.phone || '',
        email: user.email,
        image: user.avatar
      },
      featured: featured || false
    });
    
    // Save property
    await property.save();
    
    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if user is the agent who created the property or an admin
    if (
      property.agent.id.toString() !== req.user.id && 
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }
    
    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(updatedProperty);
  } catch (error) {
    console.error('Update property error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if user is the agent who created the property or an admin
    if (
      property.agent.id.toString() !== req.user.id && 
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }
    
    // Delete property
    await Property.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error('Delete property error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get featured properties
exports.getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);
    
    res.json(properties);
  } catch (error) {
    console.error('Get featured properties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get recent properties
exports.getRecentProperties = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 3;
    
    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    
    res.json(properties);
  } catch (error) {
    console.error('Get recent properties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
