const express = require('express');
const http = require('http');
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');
const productRouters = require('./router/products.route');
const cartRouters = require('./router/carts.route');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8080;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use('/api/products', productRouters);
app.use('/api/carts', cartRouters);

app.get('/home', (req, res) => {
    res.render('home', { productos: obtenerProductos() });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos: obtenerProductos() });
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('nuevoProducto', () => {
        io.emit('actualizarProductos', { productos: obtenerProductos() });
    });
});

function obtenerProductos() {
    return [{ /* producto 1 */ }, { /* Producto 2 */ }];
}

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
