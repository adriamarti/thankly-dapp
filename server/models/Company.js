const mongoose = require('mongoose');

const pathwaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: false
});

const companySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ethereumAddress: {
    type: String,
    required: true,
  },
  pathways: {
    type: [pathwaySchema],
    required: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema)