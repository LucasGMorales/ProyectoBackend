const express = require('express');
const ProductManager = require('../clases');

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    const limit = req.query.limit;
    let productos = productManager.getProducts();

    if (limit) {
        productos = productos.slice(0, limit);
    }

    res.json(productos);
});

router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const producto = productManager.getProductById(pid);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const nuevoProducto = req.body;
    productManager.addProduct(nuevoProducto);
    res.json({ mensaje: 'Producto agregado' });
});

router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const productoActualizado = req.body;
    productManager.updateProduct(pid, productoActualizado);
    res.json({ mensaje: 'Producto actualizado' });
});

router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    productManager.deleteProduct(pid);
    res.json({ mensaje: 'Producto eliminado' });
});

module.exports = router;
