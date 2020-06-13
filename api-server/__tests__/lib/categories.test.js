'use strict';


const categories = require('../../models/categories-mod/categories-model.js');


describe('Categories Mongoos', () => {

  it('It should be able to create new category', () => {
    let obj = {
      'name': 'hats',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  

  it('It should be able to get all hat category', () => {
    let obj =  {
      'name': 'hats',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    categories.create(obj)
      .then(record => {
        categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[key]).toEqual(obj[key]);
            });
          });
      });
  });
  
  it('It should be able to update a category', () => {
    let obj =  {
      'name': 'hats',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    categories.create(obj)
      .then(record => {
        categories.update(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[key]).toEqual(obj[key]);
            });
          });
      });
  });
  
  it('It should be able to get all category', () => {
    let obj =  {
      'name': 'hats',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    categories.create(obj)
      .then(record => {
        categories.get(record._id)
          .then(category => {
            console.log(category);
            Object.keys(obj).forEach(key => {
              expect(category[key]).toEqual(obj[key]);
            });
          });
      });
  });
  
  it('It should be able to Delete a hat category ', () => {
    let obj =  {
      'name': 'hats',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    categories.create(obj)
      .then(record => {
        categories.delete(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[key]).toEqual(obj[key]);
            });
          });
      });
  });
  
});