const app = require('../app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('demo', function () {
  after(function () {
    server.close();
  });

  describe('when GET /redirect', function () {
    it('redirect api unit test', function (done) {
      request
        .get('/redirect')
        .expect(302)
        .expect(/redirect/, done);
    });
  });

  describe('when POST /postTest', function () {
    it('postTest api unit test', function (done) {
      request
        .post('/postTest')
        .send({ data: '123' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect(/12/, done);
    });
  });
});
