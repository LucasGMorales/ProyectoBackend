const express = require('express');
const http = require('http');
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');
const bodyParser = require('body-parser'); // Agregar Body Parser
const productRouters = require('./router/products.route');
const cartRouters = require('./router/carts.route');
const ProductManager = require('./dao/db/productsManager');
const Database = require('./dao/db/db');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8080;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use('/api/products', productRouters);
app.use('/api/carts', cartRouters);

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
    Database.connect()
        .then(() => {
            const productManager = new ProductManager(io);
        })
        .catch((error) => {
            console.error('Error al conectar a la base de datos:', error);
        });
});
