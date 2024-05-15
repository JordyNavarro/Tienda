const mongoose = require('mongoose');
const { customerSchema } = require('./schemas');

const customerModel = mongoose.model('Customer', customerSchema);

module.exports = {customerModel };