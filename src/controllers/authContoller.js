//const registerModel = require('../models/registerModel');
const authServices = require('../services/authService');

const loginView = (req, res) => {

    res.render('login');

};

const registerView = (req, res) => {

    res.render('register');

};

const login = async (req, res) => {

    authServices.login(req.body, res);

}

const register = (req, res) => {

    authServices.register(req.body, res);

}

const logout = (req, res) => {

    res.clearCookie('auth');

    res.redirect('/');
} 

module.exports = {
    loginView,
    registerView,
    login,
    register,
    logout
}