const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const alumnoRoutes = require('./routes/alumno.routes');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Escolar - Módulo Alumnos', version: '1.0.0' },
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis: [], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Definición manual COMPLETA (GET, POST, PUT, DELETE)
swaggerDocs.paths = {
  '/api/alumnos': {
    get: {
      summary: 'Listar alumnos',
      tags: ['Alumnos'],
      responses: { 200: { description: 'Lista obtenida' } }
    },
    post: {
      summary: 'Crear alumno',
      tags: ['Alumnos'],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object', properties: { nombres: { type: 'string' }, apellidos: { type: 'string' }, email: { type: 'string' }, grado: { type: 'string' } } } } }
      },
      responses: { 201: { description: 'Creado' } }
    }
  },
  '/api/alumnos/{id}': {
    get: {
      summary: 'Obtener un alumno',
      tags: ['Alumnos'],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { 200: { description: 'Alumno encontrado' } }
    },
    put: {
      summary: 'Actualizar alumno',
      tags: ['Alumnos'],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { type: 'object', properties: { grado: { type: 'string' }, promedio: { type: 'number' } } } } }
      },
      responses: { 200: { description: 'Actualizado' } }
    },
    delete: {
      summary: 'Eliminar alumno',
      tags: ['Alumnos'],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { 200: { description: 'Eliminado' } }
    }
  }
};

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (req, res) => res.json({ message: 'API Alumnos lista ' }));
app.use('/api/alumnos', alumnoRoutes);

module.exports = app;
