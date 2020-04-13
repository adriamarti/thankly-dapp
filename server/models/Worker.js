const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  pathwayId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Worker', workerSchema)