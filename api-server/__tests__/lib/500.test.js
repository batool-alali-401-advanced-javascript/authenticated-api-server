'use strict';

const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe(' 500 middleware Testing ', () => {

  
  it('should respond with 500 on an invalid route ', () => {
    return mockRequest
      .get('/test')
      .then(data => {
        expect(data.status).toBe(500);
      }).catch(err => console.error(err));
  }); 

  it('should respond with 500 on an invalid method ', () => {
    return mockRequest
      .delete('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(500);
      }).catch(err => console.error(err));
  }); 

  
}); 