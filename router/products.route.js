const express = require('express');
const ProductManager = require('../dao/db/productsManager');

const router = express.Router();
const productManager = new ProductManager();
router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', query = '' } = req.query;
        
        const result = await productManager.getProducts({}, page, limit, sort, query);

        const totalPages = Math.ceil(result.totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;

        const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        res.json({
            status: 'success',
            payload: result.products,
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

router.post('/', async (req, res) => {
    try {
        const nuevoProducto = req.body;
        await productManager.addProduct(nuevoProducto);
        res.json({ mensaje: 'Producto agregado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
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
