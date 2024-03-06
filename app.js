const express = require('express');
const http = require('http');
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const productRouters = require('./router/products.route');
const cartRouters = require('./router/carts.route');
const ProductManager = require('./dao/db/productsManager');
const Database = require('./dao/db/db');
const usersRoutes = require('./routes/users.route');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8080;

app.use('/users', usersRoutes);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/products', async (req, res) => {
    try {
        const products = await obtenerProductos();
        res.render('products', { products });
    } catch (error) {
        console.log('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await obtenerCarrito(cid);
        res.render('cart', { cart }); 
    } catch (error) {
        console.log('Error al obtener el carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});

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
