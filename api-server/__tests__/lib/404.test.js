'use strict';
const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('sever', () => {
  it('should respond with 404 on an invalid route', () => {
    return mockRequest.get('/test').then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('should respond with 404 on an invalid method', () => {
    return mockRequest.delete('/api/v1/products').then((results) => {
      // console.log(results);
      expect(results.status).toBe(404);
    });
  });
});