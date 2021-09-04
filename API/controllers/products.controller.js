const createError = require ('http-errors');
const Product = require ('../models/product.model.js');

module.exports.list = (req, res, next) => {
    //Search M3.W4.D4.P1 00.54.00
    const { search, category } = req.query;
    let criterial = {};
    if (search) {
        criterial.name = new RegExp(search, 'i');
    }
    if (category) {
        criterial.category = category;
    }

    Product.find(criterial)
        .then(products => res.json(products))
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    res.json(req.product);
}

module.exports.delete = (req, res, next) => {
    Product.deleteOne({ _id: req.product.id })
        .then(() => res.status(204).send())
        .catch(error => next(error))
}
