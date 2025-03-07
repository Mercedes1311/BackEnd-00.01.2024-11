require("dotenv").config();
const express = require("express");
const http = require('http');
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 8080;
app.use(express.static("public"));


io.on("connection",(socket)=>{
    console.log("Nuevo usuario conectado");
    socket.on("sendMessage", (message, callback)=>{
        try {
            console.log(message)
            switch (message) {
                case "Hola":
                    socket.emit("message", "Que tal");
                    break;
            
                default:
                    break;
            }
            
            callback();
        } catch (error) {
            
        }
    });
    socket.on("disconnect", ()=>{console.log("Usuario Desconectado")})
})


server.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})