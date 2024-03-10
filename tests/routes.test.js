const request = require('supertest');
const app = require('../app.js');

describe('Test pageRoutes', () => {
  test('homepage route', async () => {
    const response = await request(app)
    .get('/');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('login page', async () => {
    const response = await request(app)
    .get('/login');
    expect(response.status).toBe(200);
  });

  test('signup page', async () => {
    const response = await request(app)
    .get('/signup');
    expect(response.status).toBe(200);
  });

  test('/personal-cookbook', async () => {
    const response = await request(app)
    .get('/personal-cookbook');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('/personal-recipe', async () => {
    const response = await request(app)
    .get('/personal-recipe/randomvalue');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('/public-recipe', async () => {
    const response = await request(app)
    .get('/public-recipe/randomvalue');
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/[\s\S]+Recipe not exist[\s\S]+Go Back[\s\S]+/);
  });
  
  test('/edit-recipe', async () => {
    const response = await request(app)
    .get('/edit-recipe/randomvalue');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('/settings', async () => {
    const response = await request(app)
    .get('/settings');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('/search-recipe', async () => {
    const response = await request(app)
    .get('/search-recipe');
    expect(response.status).toBe(200);
  });
});
