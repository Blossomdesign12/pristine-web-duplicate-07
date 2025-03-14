
const User = require('../models/User');
const Property = require('../models/Property');
const bcrypt = require('bcryptjs');

// Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ 
      role: { $in: ['agent', 'owner'] } 
    })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(agents);
  } catch (error) {
    console.error('Get all agents error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, description, avatar } = req.body;
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (description) user.description = description;
    if (avatar) user.avatar = avatar;
    
    user.updatedAt = Date.now();
    
    // Save user
    await user.save();
    
    // Return updated user without password
    const updatedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      description: user.description
    };
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if current password matches
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    user.updatedAt = Date.now();
    
    // Save user
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get properties by agent
exports.getAgentProperties = async (req, res) => {
  try {
    const properties = await Property.find({ 'agent.id': req.params.id })
      .sort({ createdAt: -1 });
    
    res.json(properties);
  } catch (error) {
    console.error('Get agent properties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    
    let data = {
      totalProperties: 0,
      featuredProperties: 0,
      recentProperties: [],
      userInfo: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        phone: req.user.phone,
        description: req.user.description
      }
    };
    
    // If user is agent, owner or admin
    if (role === 'agent' || role === 'owner' || role === 'admin') {
      // Get total properties count
      const query = role === 'admin' ? {} : { 'agent.id': userId };
      
      data.totalProperties = await Property.countDocuments(query);
      
      // Get featured properties count
      data.featuredProperties = await Property.countDocuments({
        ...query,
        featured: true
      });
      
      // Get recent properties
      data.recentProperties = await Property.find(query)
        .sort({ createdAt: -1 })
        .limit(5);
    }
    
    // If user is admin, get additional stats
    if (role === 'admin') {
      // Get user counts
      data.totalUsers = await User.countDocuments();
      data.totalAgents = await User.countDocuments({ role: 'agent' });
      data.totalOwners = await User.countDocuments({ role: 'owner' });
      data.totalBuyers = await User.countDocuments({ role: 'buyer' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
