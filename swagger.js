const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Campus Study Hub Api',
        description: 'SPI for managing study groups, users, session, and resources.',
    }, 
    host: process.env.PORT ? 'campus-study-hub-fphx.onrender.com' : 'localhost:8080',
    schemes: ['https', 'http']
}; 

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);