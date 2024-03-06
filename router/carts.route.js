const express = require('express');
const router = express.Router();
const CartManager = require('../path/to/cartManager');
const cartController = require('../controllers/cartController');

const handleErrors = (res, error) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
};
router.post('/', cartController.createCart);

router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartId = `carrito_${cid}`;

    try {
        const cartManager = new CartManager();
        await cartManager.addProductToCart(cartId, pid, quantity);
        res.json({ mensaje: 'Producto agregado al carrito' });
    } catch (error) {
        handleErrors(res, error);
    }
});

router.put('/:cid', async (req, res) => {
    const cartId = `carrito_${req.params.cid}`;

    try {
        const cartManager = new CartManager();
        await cartManager.updateCart(cartId, req.body);
        res.json({ mensaje: 'Carrito actualizado correctamente' });
    } catch (error) {
        handleErrors(res, error);
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartId = `carrito_${cid}`;

    try {
        const cartManager = new CartManager();
        await cartManager.updateProductQuantity(cartId, pid, quantity);
        res.json({ mensaje: 'Cantidad de producto actualizada en el carrito' });
    } catch (error) {
        handleErrors(res, error);
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cartId = `carrito_${cid}`;

    try {
        const cartManager = new CartManager();
        await cartManager.removeProductFromCart(cartId, pid);
        res.json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error) {
        handleErrors(res, error);
    }
});

router.delete('/:cid', async (req, res) => {
    const cartId = `carrito_${req.params.cid}`;

    try {
        const cartManager = new CartManager();
        await cartManager.clearCart(cartId);
        res.json({ mensaje: 'Carrito vaciado correctamente' });
    } catch (error) {
        handleErrors(res, error);
    }
});

module.exports = router;
