require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error(err));

// Importar rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cursos', require('./routes/cursos'));
app.use('/api/ordenes', require('./routes/ordenes'));
app.use('/api/cupones', require('./routes/cupones'));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
