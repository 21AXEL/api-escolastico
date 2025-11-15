// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const alumnoRoutes = require('./routes/alumno.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ruta base
app.get('/', (req, res) => {
  res.json({
    message: 'API Escolástica funcionando 🚀'
  });
});

// Rutas de alumnos
app.use('/api/alumnos', alumnoRoutes);

// Manejo de ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

module.exports = app;
