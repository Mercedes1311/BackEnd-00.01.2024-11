// Importamos las dependencias necesarias
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Cargar las variables de entorno
dotenv.config();

// Configuración de la app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => console.log("❌ Error en MongoDB", err));

// Definir modelo de Mensajes
const MessageSchema = new mongoose.Schema({
    user: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", MessageSchema);

// Servir archivos estáticos (como el HTML del frontend)
app.use(express.static("public"));

// Ruta REST para obtener todos los mensajes
app.get("/messages", async (req, res) => {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
});

// Websockets para comunicación en tiempo real
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    // Enviar mensajes previos al nuevo usuario
    Message.find().then(messages => {
        socket.emit("chat history", messages);
    });

    // Escuchar nuevos mensajes
    socket.on("chat message", async (msg) => {
        const message = new Message(msg);
        await message.save();
        io.emit("chat message", message);
    });

    // Borrar historial de mensajes
    socket.on("clear chat", async () => {
        await Message.deleteMany({});
        io.emit("chat cleared");
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
