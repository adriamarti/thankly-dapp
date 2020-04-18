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
    required: false,
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
  },
  transactions: {
    type: Array,
    required: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Worker', workerSchema)