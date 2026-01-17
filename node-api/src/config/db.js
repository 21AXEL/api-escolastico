// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/escolastico_db';

  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    // Propagar el error para que server.js decida si cierra el proceso
    throw error;
  }
};

module.exports = connectDB;
