const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', query = '' } = req.query;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { [sort]: 1 } : null 
        };

        const result = await Product.paginate({ title: { $regex: query, $options: 'i' } }, options);

        const totalPages = Math.ceil(result.totalDocs / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        res.json({
            status: 'success',
            payload: result.docs,
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
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await Product.create(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updatedFields = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(pid, updatedFields, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const deletedProduct = await Product.findByIdAndDelete(pid);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
