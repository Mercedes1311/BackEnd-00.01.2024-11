const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new User({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();
    res.json({ message: 'Usuario creado' });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
