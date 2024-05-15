const mongoose = require('mongoose');
const saleSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
      },
    customer_id: {
      type: Number,
      required: true
    },
    product_id: {
        type: Number,
        required: true
    },
    quantify: {
      type: Number,
      required: true
  },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = {saleSchema}