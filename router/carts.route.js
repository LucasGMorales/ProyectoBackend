const express = require('express');
const fs = require('fs');

const router = express.Router();

router.post('/', (req, res) => {
    const nuevoCarrito = {
        id: Date.now().toString(),
        products: []
    };

    fs.writeFileSync('carrito.json', JSON.stringify(nuevoCarrito, null, 2), 'utf-8');

    res.json({ mensaje: 'Carrito creado correctamente' });
});

router.get('/:cid', (req, res) => {
    const cid = req.params.cid;
    const carritoPath = `carrito_${cid}.json`;

    try {
        const data = fs.readFileSync(carritoPath, 'utf8');
        const carrito = JSON.parse(data);
        res.json(carrito.products);
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const carritoPath = `carrito_${cid}.json`;

    try {
        const data = fs.readFileSync(carritoPath, 'utf8');
        const carrito = JSON.parse(data);
        const existingProduct = carrito.products.find(item => item.id === pid);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            carrito.products.push({ id: pid, quantity: 1 });
        }

        fs.writeFileSync(carritoPath, JSON.stringify(carrito, null, 2), 'utf-8');

        res.json({ mensaje: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

module.exports = router;
