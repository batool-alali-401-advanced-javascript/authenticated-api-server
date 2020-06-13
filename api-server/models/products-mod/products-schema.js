'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
  name : {type : String , required : true},
  category : {type : String , required : true},
  display_name: { required: true, type: 'string' },
  description: { required: true, type: 'string' },
  _id: { required: true, type: Number },
});

module.exports = mongoose.model('products', products);