const Product = require('../models/product.model');
const Order = require('../models/order.model');

module.exports.order = (req, res, next) => {
    Order.create({
        products: req.products,
        user: req.user.id,
        totalPrice:req.body.totalprice
    })
        .then(order => res.status(201).json(order))
        .catch(next)
}
