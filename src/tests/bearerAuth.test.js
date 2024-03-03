require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const request = require('supertest');
const express = require('express');
const bearerAuthMiddleware = require('../middleware/bearerAuth');

const app = express();

app.use(bearerAuthMiddleware);

app.get('/test', (__, res) => {
  res.json({ success: true });
});

describe('Bearer Authentication Middleware', () => {
  it('should return 401 if no token provided', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized: Invalid token');
  });

  it('should return 401 if invalid token provided', async () => {
    const response = await request(app).get('/test').set("Authorization", "Bearer invalid_token");
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized: Invalid token');
  });

  it('should allow access if valid token provided', async () => {
    const validToken = process.env.TOKEN;

    const response = await request(app).get('/test').set('Authorization', `Bearer ${validToken}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
