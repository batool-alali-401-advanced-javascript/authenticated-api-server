'use strict';

const products = require('../../models/products-mod/products-model.js');


describe('Products Mongoos', () => {

  it('It should be able to create new product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    products.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('It should be able to get all hat product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    products.create(obj)
      .then(record => {
        products.get(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('It should be able to update a product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    products.create(obj)
      .then(record => {
        products.get(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('It should be able to get all product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    products.create(obj)
      .then(record => {
        products.update(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('It should be able to Delete a hat product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    products.create(obj)
      .then(record => {
        products.delete(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[key]).toEqual(obj[key]);
            });
          });
      });
  });

});