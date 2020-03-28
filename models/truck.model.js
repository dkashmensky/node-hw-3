const mongoose = require('mongoose');

const { Schema } = mongoose;

const TruckSchema = new Schema({
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
    default: 'IS',
  },
  type_id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Trucks', TruckSchema);
