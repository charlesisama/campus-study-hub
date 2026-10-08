
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Users GET endpoints', () => {
    test('GET /users returns 200', async () => {
        const response = await request(app).get('/users');

        expect(response.statusCode).toBe(200);
    });

    test('GET /users returns an array', async () => {
        const response = await request(app).get('/users');

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /users/:id returns 400 for an invalid ID', async () => {
        const response = await request(app).get('/users/invalid-id');

        expect(response.statusCode).toBe(400);
    });

    test('GET /users/:id returns 404 for a nonexistent user', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        const response = await request(app).get(`/users/${id}`);

        expect(response.statusCode).toBe(404);
    });
});