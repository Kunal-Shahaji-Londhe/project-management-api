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
                    ? process.env.RENDER_URL  // Replace with your Render URL
                    : 'http://localhost:3000',
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',

            },
        ],
    /* }, */
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
                bearerAuth: [], // Apply bearerAuth globally
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);