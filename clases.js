class ProductManager {
    constructor() {
        this.productos = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // validacion campos, testeado con node, al faltar un campo da el console log!
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios")
            return;
        }

        // validacion code, tambien testeado con node, al ser el mismo code da el console log!
        if (this.productos.some(producto => producto.code === code)) {
            console.log(`El producto con código ${code} ya existe.`);
            return;
        }else{
            console.log(`El producto con código ${code} ha sido agregado correctamente!`)
        }

        //creacion producto
        const nuevoProducto = {
            id: this.nextId,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.productos.push(nuevoProducto);
        this.nextId++;
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        const producto = this.productos.find(producto => producto.id === id);

        if (producto) {
            return producto;
        } else {
            console.log("Error 404 producto no encontrado.");
            return null;
        }
    }

}

module.exports = ProductManager;
