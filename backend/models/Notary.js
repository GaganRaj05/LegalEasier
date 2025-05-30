const mongoose = require('mongoose');

const notarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  preferred_method: {
    type: [String],
    enum: ['phone','email'],
    default: 'email'
  },
  license_number: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  expiration_date: {
    type: Date,
    required: true
  },
  services_offered: {
    type: [String],
    required: true
  },
  business_name: {
    type: String
  },
  business_address: {
    type: String
  },
  website_url: {
    type: String
  },
  years_in_business: {
    type: Number
  }
});

module.exports = mongoose.model('notary', notarySchema);
