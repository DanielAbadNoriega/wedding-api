const express = require('express');
const products = require('../controllers/products.controller');
const users = require('../controllers/users.controller');
const comments = require('../controllers/comment.controller');
const rates = require('../controllers/rate.controller')
const product = require('../middlewares/product.mid');
const secure = require('../middlewares/secure.mid');
const upload = require('../config/multer.config')
const router = express.Router();

//Products
router.get('/products', products.list);
router.get('/products/:id', product.exists, products.detail);

router.post('/products/:id/comments', comments.comment);
router.post('/products/:id/rate', rates.rate)

//User
router.post('/users', users.create);
router.get('/profile', secure.isAuthenticated, users.get);
router.delete('/users/:id', secure.isAuthenticated, users.delete);
router.put('/users/:id', secure.isAuthenticated, secure.isUser, users.edit)

router.post('/login', secure.isNotAuthenticated ,users.login);
router.post('/logout', secure.isAuthenticated, users.logout);

router.get('/authenticate/google', users.loginWithGoogle);
router.get('/authenticate/google/cb', users.doLoginWithGoogle);



/*

POST /products/:id/purchase

GET /orders

*/
module.exports = router;