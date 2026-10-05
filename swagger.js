const swaggerAutogen = require('swagger-autogen')();

const port = process.env.PORT || 8080;
const isProduction = process.env.RENDER === 'true';

const doc = {
    info: {
        title: 'Campus Study Hub API',
        description:
            'RESTful API for managing university study groups, users, study sessions, and learning resources.',
        version: '1.0.0'
    },

    host: isProduction
        ? 'campus-study-hub-fphx.onrender.com'
        : `localhost:${port}`,

    basePath: '/',

    schemes: isProduction
        ? ['https']
        : ['http']
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully.');
});