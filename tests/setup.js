
require('dotenv').config();

const mongoose = require('mongoose');

beforeAll(async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is missing from the .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});