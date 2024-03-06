
const Cart = require('../dao/db/models/carts');

class CartController {
    async createCart(req, res) {
        try {
            const { userId, products } = req.body;
            const newCart = await Cart.create({ userId, products });
            res.status(201).json(newCart);
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = new CartController();
