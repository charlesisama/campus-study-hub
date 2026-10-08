
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Study Sessions GET endpoints', () => {
    test('GET /sessions returns 200', async () => {
        const response = await request(app).get('/sessions');

        expect(response.statusCode).toBe(200);
    });

    test('GET /sessions returns an array', async () => {
        const response = await request(app).get('/sessions');

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /sessions/:id returns 400 for an invalid ID', async () => {
        const response = await request(app).get('/sessions/invalid-id');

        expect(response.statusCode).toBe(400);
    });

    test('GET /sessions/:id returns 404 for a nonexistent session', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        const response = await request(app).get(`/sessions/${id}`);

        expect(response.statusCode).toBe(404);
    });
});