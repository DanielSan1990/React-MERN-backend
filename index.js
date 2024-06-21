const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./database/config');

// Crear el servidor de express
const app = express();

// Conectar a la base de datos
connectDB();

// Habilitar CORS
app.use(cors());

// Servir directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Definición de rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Manejar todas las demás rutas
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
