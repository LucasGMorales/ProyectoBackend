const modeloProducto = require("./models/products")

class ProductManager {
    constructor() {
        this.path = 'productos.json';
    }
    
    cargarProducto() {
    }

    getNextId() {
    }
    

    async addProduct(title ,description ,price ,thumbnail ,code ,stock ,id) {
        try {
            await modeloProducto.create(title ,description ,price ,thumbnail ,code ,stock ,id)
            console.log("Producto Añadido")
        } catch (error) {
            console.log("Error al añadir producto")
        }
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
    }

    updateProduct(id, updatedProduct) {
    }
    

    deleteProduct(id) {
    }
    
}

module.exports = ProductsManager;
