const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/db/productsManager');

const productManager = new ProductManager();

router.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || '';
        const query = req.query.query || '';

        const result = await productManager.getProducts(limit, page, sort, query);

        const totalPages = Math.ceil(result.totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;

        const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        res.render('products', {
            products: result.products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

    router.get('/carts/:cid', async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cartDetails = await cartManager.getCartDetails(cartId);
    
            res.render('cart', { cart: cartDetails });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

});

module.exports = router;
