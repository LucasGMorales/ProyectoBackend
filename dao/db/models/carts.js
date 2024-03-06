const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
