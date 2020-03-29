const mongoose = require('mongoose');

const { Schema } = mongoose;

const LoadSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  created_by: {
    type: Number,
    required: true,
  },
  assigned_to: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    default: 'new',
  },
  state: {
    type: String,
    required: true,
    default: 'unassigned',
  },
  length: {
    type: Number,
    required: true,
    default: 0,
  },
  height: {
    type: Number,
    required: true,
    default: 0,
  },
  width: {
    type: Number,
    required: true,
    default: 0,
  },
  capacity: {
    type: Number,
    required: true,
    default: 0,
  },
  logs: [
    {
      message: {
        type: String,
      },
      time: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model('Loads', LoadSchema);
