// src/models/Alumno.js
const mongoose = require('mongoose');

const AlumnoSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
      trim: true
    },
    apellidos: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    grado: {
      type: String,
      required: true,
      trim: true
    },
    seccion: {
      type: String,
      trim: true
    },
    promedio: {
      type: Number,
      default: 0
    },
    estado: {
      type: String,
      enum: ['activo', 'retirado', 'egresado'],
      default: 'activo'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Alumno', AlumnoSchema);
