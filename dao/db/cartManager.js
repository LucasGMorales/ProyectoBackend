
const Cart = require('./models/cart');

class CartManager {
    constructor() {
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            const productIndex = cart.products.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                console.log('Cantidad del producto actualizada en el carrito');
                return cart;
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.log('Error al actualizar la cantidad del producto en el carrito:', error);
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            cart.products = cart.products.filter(item => item.id !== productId);
            await cart.save();
            console.log('Producto eliminado del carrito');
            return cart;
        } catch (error) {
            console.log('Error al eliminar el producto del carrito:', error);
            throw error;
        }
    }
}

module.exports = CartManager;
