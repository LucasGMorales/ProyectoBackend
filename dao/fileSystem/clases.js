const fs = require('fs');

class ProductManager {
    constructor(io) {
        this.io = io;
        this.path = 'productos.json';
        this.nextId = 1;
        this.cargarProducto();
    }
    
    cargarProducto() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const parsedData = JSON.parse(data);
    
            this.productos = parsedData || [];
        } catch (error) {
            console.error("Error", error);
            this.productos = [];
        }
    }

    guardarProducto() {
        try {
            const data = JSON.stringify(this.productos, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (error) {
            console.error("error", error);
        }
    }


    getNextId() {
        const maxId = this.productos.reduce((max, producto) => (producto.id > max ? producto.id : max), 0);
        return maxId + 1;
    }
    

    addProduct(producto) {
        // Validación campos, testeado con node, al faltar un campo da el console log!
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        // Validación code, también testeado con node, al ser el mismo code da el console log!
        if (this.productos.some(existingProduct => existingProduct.code === producto.code)) {
            console.log(`El producto con código ${producto.code} ya existe.`);
            return;
        } else {
            console.log(`El producto con código ${producto.code} ha sido agregado correctamente!`);
            io.emit('nuevoProducto');
        }

        producto.id = this.getNextId();
        this.nextId++;
        this.productos.push(producto);
        this.guardarProducto();
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        return this.productos.find(producto => producto.id === id);
    }

    updateProduct(id, updatedProduct) {
        const index = this.productos.findIndex(producto => producto.id === id);
    
        if (index !== -1) {
            // verifica que haya un campo
            if (Object.keys(updatedProduct).length === 0) {
                throw new Error('Se debe proporcionar al menos un campo para actualizar.');
            }
    
            updatedProduct.id = id;
            this.productos[index] = { ...this.productos[index], ...updatedProduct };
            this.guardarProducto();
        } else {
            throw new Error('Producto no encontrado');
        }
    }
    

    deleteProduct(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos.splice(index, 1);
            this.guardarProducto();
        } else {
            console.log(`Producto con ID ${id} no encontrado.`);
        }
    }
    
}

module.exports = ProductManager;
