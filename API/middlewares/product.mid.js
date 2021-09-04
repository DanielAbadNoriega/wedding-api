const createError = require('http-errors');
const Product = require('../models/product.model');

module.exports.exists = (req, res, next) => {
    //M3.W4.D3.P2.24:00
    const id = req.params.productId || req.params.id;
    Product.findById(id)
        .then(product => {
            if(product) {
                req.product = product;
                next();
            } else {
                next(createError(404, 'Product not found'));
            }
        })
        .catch(next)
}