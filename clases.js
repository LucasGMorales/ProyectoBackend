const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = 'productos.json';
        this.productos = [];
        this.cargarProducto();
    }

    cargarProducto() {
        try {

            const data = fs.readFileSync(this.path, 'utf8');
            const parsedData = JSON.parse(data);
            this.productos = Array.isArray(parsedData) ? parsedData : [];
            const highestId = this.productos.reduce((maxId, producto) => Math.max(maxId, producto.id || 0), 0);
            this.nextId = highestId + 1;

        } catch (error) {
            this.guardarProducto();
            this.nextId = 1;
        }
    }

    guardarProducto() {
        try {
            const data = JSON.stringify(this.productos, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (error) {
            console.error("Error al guardar productos:", error);
        }
    }

    addProduct(producto) {
        // validacion campos, testeado con node, al faltar un campo da el console log!
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        // validacion code, tambien testeado con node, al ser el mismo code da el console log!
        if (this.productos.some(existingProduct => existingProduct.code === producto.code)) {
            console.log(`El producto con código ${producto.code} ya existe.`);
            return;
        } else {
            console.log(`El producto con código ${producto.code} ha sido agregado correctamente!`);
        }

        producto.id = this.nextId;
        this.nextId++;
        this.productos.push(producto);
        this.guardarProducto();
    }


    // getproducts modificado para que funcione app.js
    getProducts(limit) {
        if (limit) {
            return this.productos.slice(0, limit);
        } else {
            return this.productos;
        }
    }

    getProductById(id) {
        return this.productos.find(producto => producto.id === id);
    }

    updateProduct(id, updatedProduct) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            this.productos[index] = updatedProduct;
            this.guardarProducto();
        }
    }

    deleteProduct(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos.splice(index, 1);
            this.guardarProducto();
        }
    }
}

module.exports = ProductManager;
