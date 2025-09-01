// @ts-check
const { test, expect } = require('@playwright/test');
const { app, port } = require('../app');

let server;

test.beforeAll(async () => {
  server = app.listen(port);
});

test.afterAll(async () => {
  server.close();
});

test.describe('GET /users', () => {
  test('should return empty array when no users exist', async ({ request }) => {
    const response = await request.get(`http://localhost:${port}/users`);
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toEqual([]);
  });

  test('should return array of users after creating users', async ({ request }) => {
    // Create a test user
    const createResponse = await request.post(`http://localhost:${port}/users`, {
      data: {
        name: 'Test User',
        email: 'test@example.com'
      }
    });
    expect(createResponse.ok()).toBeTruthy();

    // Get all users
    const getResponse = await request.get(`http://localhost:${port}/users`);
    expect(getResponse.ok()).toBeTruthy();
    const users = await getResponse.json();
    
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Test User');
    expect(users[0].email).toBe('test@example.com');
  });
});
