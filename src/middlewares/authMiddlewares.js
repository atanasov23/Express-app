const jwt = require('jsonwebtoken');
const config = require('../config/configFile');

exports.authMiddleware = (req, res, next) => {

    const token = req.cookies['auth'];

    if (token) {

        try {

            const decodedToken = jwt.verify(token, config.development.SECRET);

            req.user = decodedToken;

            req.logged = true;

            res.locals.isLogged = true;

        } catch (err) {

            console.log(err);

            res.clearCookie('auth');

            res.redirect('/login');

        }

    }

    next();

}

exports.isLogged = (req, res, next) => {

    if(!req.logged){

        res.redirect('/login');
    }

    next();
}

