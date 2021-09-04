const mongoose =require('mongoose');
const Product = require('../models/product.model')
const products = require('../data/products.json') //aquí poner de donde sacamos los datos de los productos (modulo3.w4.d2.p2-19.04)

require('../config/db.config')

mongoose.connection.once('open', ()=> {
    mongoose.connection.dropDatabase()
    .then(()=> Product.create(products))
    .then(products => console.info(`Successfully created ${products.length} products`))
    .catch(error => console.error('An error has ocurred running seeds', error))
    .then(() => mongoose.disconnect())
})
