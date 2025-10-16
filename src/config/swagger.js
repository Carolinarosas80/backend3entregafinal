import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
const options = { definition: { openapi: '3.0.0', info: { title: 'backend3-adoptme-cooper80 API', version: '1.0.0' }, servers: [{ url: 'http://localhost:8080' }] }, apis: [path.join(process.cwd(), 'src', 'routes', '*.js')] };
const swaggerSpec = swaggerJSDoc(options);
export function setupSwagger(app) { app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); }
