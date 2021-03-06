const mongoose = require('mongoose');

const { Schema } = mongoose;

const TruckTypeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  payload: {
    type: Number,
    required: true,
  },
  dimensions: {
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model('Truck_types', TruckTypeSchema);
