const express = require('express');
const fs = require('fs');

const router = express.Router();

router.post('/:cid/products/:pid', (req, res) => {
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

router.put('/:cid', (req, res) => {
    const cid = req.params.cid;
    const carritoPath = `carrito_${cid}.json`;

    try {
        const nuevoCarrito = req.body;
        fs.writeFileSync(carritoPath, JSON.stringify(nuevoCarrito, null, 2), 'utf-8');
        res.json({ mensaje: 'Carrito actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});

router.put('/:cid/products/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const carritoPath = `carrito_${cid}.json`;

    try {
        const data = fs.readFileSync(carritoPath, 'utf8');
        const carrito = JSON.parse(data);
        const existingProduct = carrito.products.find(item => item.id === pid);

        if (existingProduct) {
            existingProduct.quantity = quantity;
            fs.writeFileSync(carritoPath, JSON.stringify(carrito, null, 2), 'utf-8');
            res.json({ mensaje: 'Cantidad de producto actualizada en el carrito' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.delete('/:cid/products/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const carritoPath = `carrito_${cid}.json`;

    try {
        const data = fs.readFileSync(carritoPath, 'utf8');
        let carrito = JSON.parse(data);
        carrito.products = carrito.products.filter(item => item.id !== pid);
        fs.writeFileSync(carritoPath, JSON.stringify(carrito, null, 2), 'utf-8');
        res.json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.delete('/:cid', (req, res) => {
    const cid = req.params.cid;
    const carritoPath = `carrito_${cid}.json`;

    try {
        fs.unlinkSync(carritoPath);
        res.json({ mensaje: 'Carrito vaciado correctamente' });
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

module.exports = router;
