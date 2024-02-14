const express = require('express');
//const ProductManager = require('../dao/fileSystem/clases');
const ProductManager = require('../dao/db/productsManager');

const router = express.Router();
const productManager = new ProductManager();
const productManagerMongo = new ProductManager();


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
    productManagerMongo.addProduct(nuevoProducto, io);
    res.json({ mensaje: 'Producto agregado' });
});

router.put('/:pid', (req, res) => {
    let pid;
    try {
        pid = parseInt(req.params.pid);
        const productoActualizado = req.body;
        productManager.updateProduct(pid, productoActualizado);
        res.json({ mensaje: `El producto con id: ${pid} se actualizó correctamente` });
    } catch (error) {
        res.status(404).json({ error: `El producto con el id: ${pid} no existe.` });
    }
});

router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const eliminado = productManager.deleteProduct(pid);

    if (eliminado) {
        res.json({ mensaje: 'Producto eliminado' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;
