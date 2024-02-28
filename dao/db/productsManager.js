const Product = require("./models/products");


class ProductManager {
    constructor() {
    }

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
            console.log("Producto Añadido");
        } catch (error) {
            console.log("Error al añadir producto:", error);
        }
    }
    
    
    

    async getProducts(filters = {}, page = 1, limit = 10, sort = {}) {
        try {
            const query = Product.find(filters);
        
            const skip = (page - 1) * limit;
            query.skip(skip).limit(limit);
    
            if (sort) {
                query.sort(sort);
            }
        
            const products = await query.exec();
            return products;
        } catch (error) {
            console.log("Error al obtener productos:", error);
            return [];
        }
    }
    
    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            console.log("Error al obtener producto por ID:", error);
            return null;
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
