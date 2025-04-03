const mongoose = require('mongoose');

const CuponSchema = new mongoose.Schema({
    codigo: String,
    descuento: Number,
    activo: Boolean
});

module.exports = mongoose.model('Cupon', CuponSchema);
