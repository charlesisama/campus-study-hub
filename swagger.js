const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Campus Study Hub API',
        description: 'API for managing study groups, users, sessions, and resources.'
    },

    host: process.env.PORT ? 'campus-study-hub-fphx.onrender.com' : 'localhost:8080',
    schemes: ['https', 'http']
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);