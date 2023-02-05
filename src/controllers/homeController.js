const fs = require('fs');
const cube = require('../models/cubeModel');

exports.homeView = async (req, res) => {

    const cubes = await cube.find().lean();

    res.render('home', { cubes });
}

exports.aboutPage = (req, res) => {

    res.render('about');

}