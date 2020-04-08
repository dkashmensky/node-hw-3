const mongoose = require('mongoose');

const { Schema } = mongoose;

function allowEmptyString() {
  return typeof this.assigned_to === 'string';
}

const TruckSchema = new Schema({
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    required: allowEmptyString(),
    default: '',
  },
  status: {
    type: String,
    required: true,
    default: 'IS',
  },
  type: {
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
  comment: String,
});

module.exports = mongoose.model('Trucks', TruckSchema);
