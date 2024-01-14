const express = require('express');
const ProductManager = require('./clases');

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.get('/', (req, res) => {
    res.send('aguante maxi');
});

app.get('/products', (req, res) => {

    const limit = req.query.limit;
    let productos = productManager.getProducts();

    if (limit) {
        productos = productos.slice(0, limit);
    }

    res.json(productos);
});

app.get('/products/:pid', (req, res) => {

    const pid = parseInt(req.params.pid);
    const producto = productManager.getProductById(pid);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
