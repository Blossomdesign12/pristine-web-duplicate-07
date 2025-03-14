
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'India'
    },
    lat: Number,
    lng: Number
  },
  features: {
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    area: {
      type: Number,
      required: true
    },
    yearBuilt: {
      type: Number,
      required: true
    },
    propertyType: {
      type: String,
      enum: ['apartment', 'house', 'villa', 'plot', 'penthouse'],
      required: true
    },
    status: {
      type: String,
      enum: ['for-sale', 'for-rent', 'sold', 'pending'],
      required: true
    },
    floorPlan: String
  },
  amenities: [String],
  images: [String],
  agent: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    phone: String,
    email: String,
    image: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before each update
propertySchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: new Date() });
});

module.exports = mongoose.model('Property', propertySchema);
