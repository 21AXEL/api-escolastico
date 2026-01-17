// src/controllers/alumno.controller.js
const Alumno = require('../models/Alumno');

// Crear un alumno
const crearAlumno = async (req, res) => {
  try {
    const datos = req.body;

    const alumno = await Alumno.create(datos);

    return res.status(201).json({
      message: 'Alumno creado correctamente',
      data: alumno
    });
  } catch (error) {
    console.error('Error al crear alumno:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'El email ya está registrado'
      });
    }
    return res.status(500).json({
      message: 'Error interno al crear el alumno'
    });
  }
};

// Listar alumnos con búsqueda + filtros + paginación
const listarAlumnos = async (req, res) => {
  try {
    const {
      search,
      grado,
      estado,
      minPromedio,
      maxPromedio,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filtro = {};

    // Búsqueda por nombre, apellido o email
    if (search) {
      const regex = new RegExp(search, 'i');
      filtro.$or = [
        { nombres: regex },
        { apellidos: regex },
        { email: regex }
      ];
    }

    // Filtro por grado
    if (grado) {
      filtro.grado = grado;
    }

    // Filtro por estado
    if (estado) {
      filtro.estado = estado;
    }

    // Filtro por rango de promedio
    if (minPromedio || maxPromedio) {
      filtro.promedio = {};
      if (minPromedio) {
        filtro.promedio.$gte = Number(minPromedio);
      }
      if (maxPromedio) {
        filtro.promedio.$lte = Number(maxPromedio);
      }
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [total, alumnos] = await Promise.all([
      Alumno.countDocuments(filtro),
      Alumno.find(filtro)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)
    ]);

    return res.json({
      data: alumnos,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber)
      }
    });
  } catch (error) {
    console.error('Error al listar alumnos:', error);
    return res.status(500).json({
      message: 'Error interno al listar alumnos'
    });
  }
};

// Obtener un alumno por ID
const obtenerAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    const alumno = await Alumno.findById(id);

    if (!alumno) {
      return res.status(404).json({
        message: 'Alumno no encontrado'
      });
    }

    return res.json({
      data: alumno
    });
  } catch (error) {
    console.error('Error al obtener alumno:', error);
    return res.status(500).json({
      message: 'Error interno al obtener el alumno'
    });
  }
};

// Actualizar un alumno
const actualizarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const alumno = await Alumno.findByIdAndUpdate(id, datos, {
      new: true,
      runValidators: true
    });

    if (!alumno) {
      return res.status(404).json({
        message: 'Alumno no encontrado'
      });
    }

    return res.json({
      message: 'Alumno actualizado correctamente',
      data: alumno
    });
  } catch (error) {
    console.error('Error al actualizar alumno:', error);
    return res.status(500).json({
      message: 'Error interno al actualizar el alumno'
    });
  }
};

// Eliminar un alumno
const eliminarAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    const alumno = await Alumno.findByIdAndDelete(id);

    if (!alumno) {
      return res.status(404).json({
        message: 'Alumno no encontrado'
      });
    }

    return res.json({
      message: 'Alumno eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar alumno:', error);
    return res.status(500).json({
      message: 'Error interno al eliminar el alumno'
    });
  }
};

module.exports = {
  crearAlumno,
  listarAlumnos,
  obtenerAlumno,
  actualizarAlumno,
  eliminarAlumno
};
