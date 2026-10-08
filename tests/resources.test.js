
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Resources GET endpoints', () => {
    test('GET /resources returns 200', async () => {
        const response = await request(app).get('/resources');

        expect(response.statusCode).toBe(200);
    });

    test('GET /resources returns an array', async () => {
        const response = await request(app).get('/resources');

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /resources/:id returns 400 for an invalid ID', async () => {
        const response = await request(app).get('/resources/invalid-id');

        expect(response.statusCode).toBe(400);
    });

    test('GET /resources/:id returns 404 for a nonexistent resource', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        const response = await request(app).get(`/resources/${id}`);

        expect(response.statusCode).toBe(404);
    });
});