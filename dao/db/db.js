const mongoose = require('mongoose');

module.exports = {
    collection: null,
    connect: () => {
        return mongoose.connect("mongodb+srv://lucas2:lucas@ecommerce.aa2i5cy.mongodb.net/ecommerce")
        .then(()=>{
            console.log('base de datos conectada')
        }).catch ((err)=>{
            console.log(err)
        })
    }
}