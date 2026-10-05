const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.RENDER === "true";

const doc = {
    info: {
        title: 'Campus Study Hub API',
        description: 'API for managing study groups, users, sessions, and resources.',
        version: '1.0.0'
    },
   
    host: isProduction
        ? "https://campus-study-hub-fphx.onrender.com"
        : "localhost:3000",

    basePath: "/",

    schemes: isProduction
        ? ["https"]
        : ["http"],
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);