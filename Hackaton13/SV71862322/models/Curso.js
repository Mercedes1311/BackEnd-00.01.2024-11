const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    img: String,
    portada: String,
    valor: Number
});

module.exports = mongoose.model('Curso', CursoSchema);
