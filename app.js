const express = require('express');
const ProductManager = require('./clases');

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.get('/', (req, res) => {
    res.send('aguante maxi');
});

app.get('/products', async (req, res) => {
    await productManager.cargarProducto();
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = productManager.getProducts(limit);
    res.json(products);
});

app.get('/products/:pid', async (req, res) => {
    await productManager.cargarProducto();
    const pid = parseInt(req.params.pid);
    const product = productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
