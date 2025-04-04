import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Libros',
            version: '1.0.0',
            description: 'Documentación de la API para gestionar libros',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor local',
            },
        ],
        components: {
            schemas: {
                Libro: {
                    type: 'object',
                    required: ['titulo'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID único del libro generado por MongoDB',
                        },
                        titulo: {
                            type: 'string',
                            description: 'Título del libro',
                        },
                        autor: {
                            type: 'string',
                            description: 'Autor del libro',
                        },
                        año: {
                            type: 'number',
                            description: 'Año de publicación del libro',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Ruta a tus archivos de rutas para analizar los comentarios JSDoc
};

const specs = swaggerJsdoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};