const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { User, Package } = require('./models');
const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de Passport y Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOrCreate({
    where: { googleId: profile.id },
    defaults: { email: profile.emails[0].value }
  });
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findByPk(id).then(user => done(null, user));
});

// Middleware de sesiones
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Rutas de OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

// Ruta para mostrar la página principal
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido al sistema de Courier</h1>');
});

// Rutas de API para manejar paquetes
app.post('/api/package', async (req, res) => {
  const { trackingNumber, location, status } = req.body;
  const package = await Package.create({
    trackingNumber,
    location,
    status,
    ownerId: req.user.id
  });
  res.json(package);
});

// Ruta para ver los paquetes del usuario autenticado
app.get('/api/packages', async (req, res) => {
  const packages = await Package.findAll({ where: { ownerId: req.user.id } });
  res.json(packages);
});

// Configurar Socket.io para mensajes en tiempo real
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('send location', async (data) => {
    const { trackingNumber, location } = data;
    const package = await Package.findOne({ where: { trackingNumber } });
    if (package) {
      package.location = location;
      await package.save();
      io.emit('location update', package);
    }
  });

  socket.on('send message', async (message) => {
    // Aquí podríamos almacenar mensajes en una base de datos o en memoria
    io.emit('chat message', message);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
