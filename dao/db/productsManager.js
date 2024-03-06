const Product = require("./models/products");

class ProductManager {
    constructor() {}

    async addProduct(title, description, price, thumbnail, code, stock, id) {
        try {
            await Product.create({
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            });
            console.log("Producto añadido correctamente");
        } catch (error) {
            console.log("Error al añadir producto:", error);
            throw error;
        }
    }

    async getProducts(filters = {}, pageNumber = 1, pageSize = 10, sort = {}) {
        try {
            const options = {
                page: pageNumber,
                limit: pageSize,
                sort: sort
            };

            const result = await Product.paginate(filters, options);
            return result;
        } catch (error) {
            console.log("Error al obtener productos:", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            console.log("Error al obtener producto por ID:", error);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const product = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            console.log("Producto actualizado correctamente");
            return product;
        } catch (error) {
            console.log("Error al actualizar producto:", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.log("Error al eliminar producto:", error);
            throw error;
        }
    }
}

module.exports = ProductManager;
