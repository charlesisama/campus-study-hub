
require('dotenv').config();

const mongoose = require('mongoose');

beforeAll(async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL is missing from the .env file');
    }

    await mongoose.connect(process.env.MONGODB_URL);
});

afterAll(async () => {
    await mongoose.disconnect();
});