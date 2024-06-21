const mongoose = require('mongoose');

/**
 * Conexión a la base de datos
 */
const connectDB = async () => {
  try {
    // Conectar a la base de datos usando las configuraciones definidas en las variables de entorno
    await mongoose.connect(process.env.DB_CNN, {
      // Opciones de configuración de mongoose (descomentadas si es necesario)
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true
    });

    console.log('Base de datos conectada');

  } catch (error) {
    console.log(error);
    throw new Error('Error al inicializar la base de datos');
  }
};

module.exports = {
  connectDB
};
