const Product = require ('../models/product.model.js');
const Comment = require('../models/comment.model');

module.exports.comment = (req, res, next) => {
    Comment.create({
        product: req.params.id, //:!!
        user: req.user.id,
        message: req.body.message
    })
        .then(comment => res.status(201).json(comment))
        .catch(next)
}