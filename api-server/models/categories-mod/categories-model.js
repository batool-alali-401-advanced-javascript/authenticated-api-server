'use strict';

const Model = require('../mongo.js');
const schema = require('./categories-schema.js');

/**
* Model Model
* @constructor Categories
*/


class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Categories(schema);
