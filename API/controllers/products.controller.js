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

module.exports.list = (req, res, next) => {
    /*
        Buscaremos todos los tweets filtrados por text (del queryparam search)
        y author (queryparam author).
    
        Además populamos los tweet.author para acceder al campo "private" del usuario.
        Populamos al virtual tweet.comments para obtener su listado de comentarios
        Populamos al virtual tweets.likes para obtener el nº de likes
    
        También buscaremos los follow para identificar aquellos usuarios que nos siguen
        (campo follow.followed == req.user.id).
    
        Una vez obtenidos los tweets, filtramos solo aquellos cuyo autor no sea privado
        o su autor.id esté incluido en nuestros seguidores.
    */

    const tweetCriteria = {}
    const followCriteria = { followed: req.user.id }

    if (req.query.search) {
        tweetCriteria.text = new RegExp(req.query.search, 'i')
    }

    if (req.query.author) {
        tweetCriteria.author = req.query.author
        followCriteria.follower = req.query.author
    }

    Promise.all([
        Tweet.find()
            .populate('author')
            .populate('comments')
            .populate('likes'),
        Follow.find({
            followed: req.user.id
        })
    ])
        .then(([tweets, follows]) => {
        const followerIds = follows.map(f => f.follower.toString())

        const visibleTweets = tweets.filter(tweet => (
            !tweet.author.private || followerIds.includes(tweet.author.id.toString())
            ))
    
            res.json(visibleTweets)
        })
        .catch(next)
}