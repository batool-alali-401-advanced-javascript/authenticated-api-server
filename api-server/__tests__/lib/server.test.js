'use strict';
const { server } = require('../../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Store API', () => {
  it('can post() a Category', () => {
    let obj = {
      'name': 'hat',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        const record = data.body; 
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  it('can get() a Category', () => {
    const  obj = {
      'name': 'hat',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        return mockRequest.get('/api/v1/categories').then((result) => {
          Object.keys(obj).forEach((key) => {
            expect(result.body.count).toEqual(1);
          });
        });
      });
  });
  it('can post() a Product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        const record = data.body; 
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  it('can get() a product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 1,
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        return mockRequest.get('/api/v1/products').then((result) => {
          Object.keys(obj).forEach((key) => {
            expect(result.body.count).toEqual(1);
          });
        });
      });
  });

  it('Can delete  a category', () => {
    const  obj = {
      'name': 'hat',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 8,
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest
          .delete(`/api/v1/categories/${data.body._id}`)
          .send(obj)
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body[0]).toBe();
          });
      });
  });

  it('Can update category', () => {
    const  obj = {
      'name': 'Car',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 8,
    };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send({
            'name': 'Hijab',
            'display_name': 'hat',
            'description': 'heads cloth',
          })
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.name).toEqual('Hijab');
          });
      });
  });
    
  it('Can delete a product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 10,
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest
          .delete(`/api/v1/products/${data.body._id}`)
          .send(obj)
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body[0]).toBe();
          });
      });
  });
  it('can a update a product', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 5,
    };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data=>{
        return mockRequest.put(`/api/v1/products/${data.body._id}`)
          .send({
            'category': 'Hijab',
            'name': 'cascade',
            'display_name': 'cascade',
            'description': 'colored cascade',
            '_id': 5,
          })
          .then(results=>{
            expect(results.status).toBe(200);
            expect(results.body.category).toEqual('Hijab');
          });
      });
  });

  it('get one product item', () => {
    let obj = {
      'category': 'hats',
      'name': 'cascade',
      'display_name': 'cascade',
      'description': 'colored cascade',
      '_id': 7,
    };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/products/${data.body._id}`)
          .then(data => {
            expect(data.body[0].name).toEqual(obj.name);
            expect(data.body.length).toEqual(1);
          });
      });
  });

  it('Can get one category item', () => {
    const  obj = {
      'name': 'Car',
      'display_name': 'hat',
      'description': 'heads cloth',
      '_id': 20,
    };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            console.log(data.body);
            expect(data.body[0].name).toEqual(obj.name);
            expect(data.body.length).toEqual(1);
          });
      });
  });

});
