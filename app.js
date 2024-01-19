const express = require('express');
const productRouters = require('./router/products.route');
const cartRouters = require('./router/carts.route');

const app = express();
const port = 8080;

app.use('/api/products', productRouters);
app.use('/api/carts', cartRouters);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
