const express = require('express');
const products = require('../controllers/products.controller');
const product = require('../middlewares/product.mid')
const users = require('../controllers/users.controller')
const router = express.Router();

//Products
router.get('/products', products.list);
router.get('/products/:id',product.exists, products.detail);
router.delete('/products/:id', product.exists ,products.delete)

//User
router.post('/users', users.create);
router.get('/users', users.get)
router.put('/users/:id', users.edit)


module.exports = router;