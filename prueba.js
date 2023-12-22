const ProductManager = require('./clases');

const productManager = new ProductManager();

productManager.addProduct("harina integral x500gr", "Harina Integral pura, cantidad 1 kilo", 2000, "https://paladear.com.ar/wp-content/uploads/2019/07/harina-integral.jpg", "01", 18);
productManager.addProduct("Pasas de uva x500gr", "Pasas de uva, cantidad 500 gramos", 1300, "https://drcormillot.com.ar/wp-content/uploads/2018/12/NOTA-008-FOTO.jpg", "02", 22);

console.log("Lista de productos:");

const encontrarIdProducto = 2;
const foundProducto = productManager.getProductById(encontrarIdProducto);

if (foundProducto) {
    console.log(`Producto code: ${encontrarIdProducto}:`, foundProducto);
} else {
    console.log(`Producto code: ${encontrarIdProducto}.`);
}
