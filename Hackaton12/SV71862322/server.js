const http = require('http');
const url = require('url');
const fs = require('fs');

let listaCompras = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/' && req.method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar la página');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/crear-lista' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const nuevaLista = JSON.parse(body);
            listaCompras.push(nuevaLista);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Lista creada con éxito' }));
        });
    } else if (pathname === '/pendientes' && req.method === 'GET') {
        const pendientes = listaCompras.filter(item => !item.EsCompletado);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pendientes));
    } else if (pathname === '/completados' && req.method === 'GET') {
        const completados = listaCompras.filter(item => item.EsCompletado);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(completados));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

