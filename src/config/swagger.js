import swaggerJsdoc from 'swagger-jsdoc';

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
                url: 'http://localhost:3000',
                description: 'Development server',
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