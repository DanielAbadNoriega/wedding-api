const User = require ('../models/user.model');
const createError = require ('http-errors');
const passport = require('passport');


module.exports.create = (req, res, next) => {
    const data = { name, phone, email, avatar, address, wishlist, password } = req.body

    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(next)
}

module.exports.get = (req, res, next) => {
    res.json(req.user);
}

module.exports.edit = (req, res, next) => {
    const data = { name, phone, email, avatar, address, wishlist } = req.body;
    const { id } = req.params;
    User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .then(user => {
            if (!user) {
                next(createError(404, 'User not found'))
            } else {
                res.status(202).json(user);
            }
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.status(204).end())
        .catch(next)
}

module.exports.logout = (req, res, next) => {
    req.logout();

    res.status(204).end()
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            next(createError(400, { errors: validations }))
        } else {
            req.login(user, error => {
            if (error) next(error)
            else res.json(user)
            })
        }
    })(req, res, next);
};

module.exports.loginWithGoogle = (req, res, next) => {
    const passportController = passport.authenticate('google-auth', {
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
        });
    
        passportController(req, res, next);
    };
    
    module.exports.doLoginWithGoogle = (req, res, next) => {
        const passportController = passport.authenticate('google-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else {
            req.login(user, error => {
            if (error) {
                next(error)
            } else {
                res.redirect('http://localhost:3000')
            }
            })
        }
    })
    
    passportController(req, res, next);
}