// src/routes/alumno.routes.js
const express = require('express');
const {
  crearAlumno,
  listarAlumnos,
  obtenerAlumno,
  actualizarAlumno,
  eliminarAlumno
} = require('../controllers/alumno.controller');

const router = express.Router();

// POST /api/alumnos
router.post('/', crearAlumno);

// GET /api/alumnos
router.get('/', listarAlumnos);

// GET /api/alumnos/:id
router.get('/:id', obtenerAlumno);

// PUT /api/alumnos/:id
router.put('/:id', actualizarAlumno);

// DELETE /api/alumnos/:id
router.delete('/:id', eliminarAlumno);

module.exports = router;
