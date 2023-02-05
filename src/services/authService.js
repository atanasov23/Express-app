const user = require('../models/registerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/configFile');

const login = async (data, res) => {

    const userData = await user.findOne({ username: data.username });

    if (userData) {

        const decryptPassword = await bcrypt.compare(data.password, userData.password);

        if (decryptPassword) {

            const payload = { username: data.username };
            const secretKey = config.development.SECRET;
            const expire = { expiresIn: '5d' };

            const token = jwt.sign(payload, secretKey, expire);

            res.cookie('auth', token, { httpOnly: true });

            res.redirect('/');

        } else {

            res.redirect('/login');

        }

    } else {

        console.log('Password or username incorrect');
        res.redirect('/login');
    }


}

const register = async (data, res) => {

    const userData = await user.findOne({ username: data.username });

    if (userData) {

        console.log('Username or password exist');

        res.redirect('/register');

    } else if (data.password !== data.repeatPassword) {

        console.log('Password don\'t match');

        res.redirect('/register');

    } else {

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(data.password, salt, (err, hash) => {

                const newUser = new user({ username: data.username, password: data.password });

                newUser.password = hash;

                newUser.save();

                res.redirect('/login');

            })

        })

    }

}

module.exports = {
    login,
    register
}