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

// buscar producto x ID  --- Este id se utiliza tambien para update y deleat, hay que comentar el codigo abajo para que no cree y elimine el mismo producto seleccionado,
// esta pensado para testear una cosa a la vez
// si no se modifica el codigo, crea y elimina el id 6, quedando el 7 en el array de productos.json
const encontrarIdProducto = 6;
const foundProducto = productManager.getProductById(encontrarIdProducto);


// getproducts
console.log(productManager.getProducts());

// updateproduct
const productoActualizado = {
    title: "producto nombre",
    description: "descripcion",
    price: 300,
    thumbnail: "imagen",
    code: "000",
    stock: 25,
    id: encontrarIdProducto 
};
productManager.updateProduct(encontrarIdProducto, productoActualizado);
console.log(productManager.getProductById(encontrarIdProducto));

// deleteproduct
const idAEliminar = encontrarIdProducto;
const productoEliminado = productManager.deleteProduct(idAEliminar);

if (productoEliminado) {
    console.log(`el producto ${idAEliminar} fue eliminado.`);
} else {
    console.log(`Error 404: prodcuto ${idAEliminar} no encontrado.`);
}

// code
if (foundProducto) {
    console.log(`Producto code: ${encontrarIdProducto}:`, foundProducto);
} else {
    console.log(`Error! Producto code: ${encontrarIdProducto}.`);
}
