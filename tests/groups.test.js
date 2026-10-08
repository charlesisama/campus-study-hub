
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Study Groups GET endpoints', () => {
    test('GET /groups returns 200', async () => {
        const response = await request(app).get('/groups');

        expect(response.statusCode).toBe(200);
    });

    test('GET /groups returns an array', async () => {
        const response = await request(app).get('/groups');

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /groups/:id returns 400 for an invalid ID', async () => {
        const response = await request(app).get('/groups/invalid-id');

        expect(response.statusCode).toBe(400);
    });

    test('GET /groups/:id returns 404 for a nonexistent group', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        const response = await request(app).get(`/groups/${id}`);

        expect(response.statusCode).toBe(404);
    });
});