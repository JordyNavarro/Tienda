const mongoose = require('mongoose');
const { customerSchema } = require('./schemas');

const customerModel = mongoose.model('People', customerSchema);

module.exports = {customerModel };