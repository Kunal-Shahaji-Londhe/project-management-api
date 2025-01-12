import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv'
dotenv.config();



const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project Management System API',
            version: '1.0.0',
            description: 'API documentation for Project Management System',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? "https://project-management-api-4vb4.onrender.com"
                    : 'http://localhost:3000',
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

export const specs = swaggerJsdoc(options);