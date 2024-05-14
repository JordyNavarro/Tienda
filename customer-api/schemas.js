const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    dni: {
        type: String,
        required: true
      },
    name: {
      type: String,
      required: true
    },
    lastname: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = {customerSchema}