const Product = require ('../models/product.model.js');
const Rate = require('../models/rating.model')

module.exports.rate = (req, res, next) => {
    Rate.create({
        product: req.params.id,
        user: req.user.id,
        rate: req.body.rate
    })
        .then(comment => res.status(201).json(comment))
        .catch(next)
}