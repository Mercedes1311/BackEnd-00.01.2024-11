const mongoose = require('mongoose');

const OrdenSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }],
    total: Number,
    pagado: Boolean
});

module.exports = mongoose.model('Orden', OrdenSchema);
