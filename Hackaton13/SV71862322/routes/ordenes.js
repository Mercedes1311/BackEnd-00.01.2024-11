const express = require('express');
const router = express.Router();
const Orden = require('../models/Orden'); // Asegúrate de que el modelo existe

// Crear una nueva orden
router.post('/', async (req, res) => {
    try {
        const nuevaOrden = new Orden(req.body);
        await nuevaOrden.save();
        res.status(201).json(nuevaOrden);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la orden", error });
    }
});

// Obtener todas las órdenes
router.get('/', async (req, res) => {
    try {
        const ordenes = await Orden.find();
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener órdenes", error });
    }
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id);
        if (!orden) return res.status(404).json({ mensaje: "Orden no encontrada" });
        res.json(orden);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la orden", error });
    }
});

// Actualizar una orden
router.put('/:id', async (req, res) => {
    try {
        const ordenActualizada = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(ordenActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la orden", error });
    }
});

// Eliminar una orden
router.delete('/:id', async (req, res) => {
    try {
        await Orden.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Orden eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la orden", error });
    }
});

module.exports = router;
