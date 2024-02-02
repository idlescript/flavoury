const request = require('supertest');
const app = require('../app.js');

describe('Test pageRoutes', () => {
  test('homepage route', async () => {
    const response = await request(app)
    .get('/');
    expect(response.status).toBe(200);
  });

  test('/personal-cookbook', async () => {
    const response = await request(app)
    .get('/personal-cookbook');
    expect(response.status).toBe(200);
  });

  test('/personal-recipe', async () => {
    const response = await request(app)
    .get('/personal-recipe');
    expect(response.status).toBe(200);
  });

  test('/public-cookbook', async () => {
    const response = await request(app)
    .get('/public-cookbook');
    expect(response.status).toBe(200);
  });

  test('/public-recipe', async () => {
    const response = await request(app)
    .get('/public-recipe');
    expect(response.status).toBe(200);
  });

  test('/edit-recipe', async () => {
    const response = await request(app)
    .get('/edit-recipe');
    expect(response.status).toBe(200);
  });

  test('/settings', async () => {
    const response = await request(app)
    .get('/settings');
    expect(response.status).toBe(200);
  });

  test('testing page', async () => {
    const response = await request(app)
    .get('/test/5');
    expect(response.status).toBe(200);
  });
});
