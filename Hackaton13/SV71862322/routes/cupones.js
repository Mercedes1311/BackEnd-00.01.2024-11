const express = require('express');
const router = express.Router();
const Cupon = require('../models/Cupon'); // Asegúrate de que el modelo existe

// Crear un nuevo cupón
router.post('/', async (req, res) => {
    try {
        const nuevoCupon = new Cupon(req.body);
        await nuevoCupon.save();
        res.status(201).json(nuevoCupon);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el cupón", error });
    }
});

// Obtener todos los cupones
router.get('/', async (req, res) => {
    try {
        const cupones = await Cupon.find();
        res.json(cupones);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener cupones", error });
    }
});

// Obtener un cupón por código
router.get('/:codigo', async (req, res) => {
    try {
        const cupon = await Cupon.findOne({ codigo: req.params.codigo });
        if (!cupon) return res.status(404).json({ mensaje: "Cupón no encontrado" });
        res.json(cupon);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el cupón", error });
    }
});

// Actualizar un cupón
router.put('/:codigo', async (req, res) => {
    try {
        const cuponActualizado = await Cupon.findOneAndUpdate(
            { codigo: req.params.codigo },
            req.body,
            { new: true }
        );
        res.json(cuponActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el cupón", error });
    }
});

// Eliminar un cupón
router.delete('/:codigo', async (req, res) => {
    try {
        await Cupon.findOneAndDelete({ codigo: req.params.codigo });
        res.json({ mensaje: "Cupón eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el cupón", error });
    }
});

module.exports = router;
