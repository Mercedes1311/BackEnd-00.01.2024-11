const express = require('express');
const Curso = require('../models/Curso');
const router = express.Router();

// Crear curso
router.post('/', async (req, res) => {
    const nuevoCurso = new Curso(req.body);
    await nuevoCurso.save();
    res.json(nuevoCurso);
});

// Obtener todos los cursos
router.get('/', async (req, res) => {
    const cursos = await Curso.find();
    res.json(cursos);
});

// Actualizar curso
router.put('/:id', async (req, res) => {
    const cursoActualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cursoActualizado);
});

// Eliminar curso
router.delete('/:id', async (req, res) => {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({ message: 'Curso eliminado' });
});

module.exports = router;
