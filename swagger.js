const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Campus Study Hub API',
        description: 'API for managing study groups, users, sessions, and resources.',
        version: '1.0.0'
    },
   
    host: process.env.RENDER_EXTERNAL_HOSTNAME || 'campus-study-hub-fphx.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);