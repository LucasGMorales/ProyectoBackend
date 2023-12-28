const ProductManager = require('./clases');

const productManager = new ProductManager(); 

// agregar productos
productManager.addProduct({
    title: "harina 0000",
    description: "Harina comun 0000",
    price: 3000,
    thumbnail: "https://imagenfalsaharina0000.com",
    code: "06",
    stock: 29
});

productManager.addProduct({
    title: "Arroz Yamani",
    description: "Arroz yamani muy rico!",
    price: 2000,
    thumbnail: "https://imagenfalsarrozyamani.com",
    code: "07",
    stock: 12
});

console.log("Lista de productos:");

// buscar producto x ID
const encontrarIdProducto = 6;
const foundProducto = productManager.getProductById(encontrarIdProducto);

if (foundProducto) {
    console.log(`Producto code: ${encontrarIdProducto}:`, foundProducto);
} else {
    console.log(`Producto code: ${encontrarIdProducto}.`);
}
