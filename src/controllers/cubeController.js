const cube = require('../models/cubeModel');
const user = require('../models/registerModel');
let id = '';

const addCube = async (req, res) => {

    const getCube = { name, description, imageUrl, difficultyLevel } = req.body;

    const userData = await user.findOne({ username: req.user.username });

    const newCube = new cube(getCube);

    newCube.ownerCube.push(userData._id);

    newCube.save();

    res.redirect('/');
}

const createView = (req, res) => {

    res.render('create');
}

const showDescription = async (req, res) => {

    id = req.params.id;

    const findCube = await cube.findById(req.params.id).populate('accessory').lean();

    const findOwner = await cube.findById(req.params.id).populate('ownerCube').lean();

    const accessories = findCube.accessory;


    if (req.logged === true) {

        if (findOwner.ownerCube !== undefined) {

            if (findOwner.ownerCube[0].username === req.user.username) {

                res.locals.owner = true;

            }
        }

    }

    res.render('details', { findCube, accessories });

}

const editCubeView = async (req, res) => {

    const currentCubeData = await cube.findById(req.params.id).lean();

    const level = [
        { level: '1', text: '1 - Very Easy' },
        { level: '2', text: '2 - Easy' },
        { level: '3', text: '3 - Medium (Standard 3x3)' },
        { level: '4', text: '4 - Intermediate' },
        { level: '5', text: '5 - Expert' },
        { level: '6', text: '6 - Hardcore' },
    ];

    level.map(a => {
        if (a.level == currentCubeData.difficultyLevel) {
            a.selected = true;
        }
    });

    res.render('edit', { currentCubeData, level });

}

const deleteCubeView = async (req, res) => {

    const cubeId = id.toString();

    const currentCubeData = await cube.findById(cubeId).lean();

    const level = [
        { level: '1', text: '1 - Very Easy' },
        { level: '2', text: '2 - Easy' },
        { level: '3', text: '3 - Medium (Standard 3x3)' },
        { level: '4', text: '4 - Intermediate' },
        { level: '5', text: '5 - Expert' },
        { level: '6', text: '6 - Hardcore' },
    ];

    let text = '';

    level.map(a => {
        if (a.level == currentCubeData.difficultyLevel) {
            text = { txt1: a.level, txt2: a.text }
        }
    });

    res.render(`delete`, { currentCubeData, text });
}

const deleteCube = async (req, res) => {

    await cube.deleteOne({ _id: id });

    res.redirect('/');

}

const editCube = async (req, res) => {

    const editData = req.body;

    await cube.updateOne({ _id: req.params.id }, { name: editData.name, description: editData.description, imageUrl: editData.imageUrl, difficultyLevel: editData.difficultyLevel });

    res.redirect(`/details/${req.params.id}`);
}

module.exports = {
    addCube,
    showDescription,
    createView,
    editCubeView,
    deleteCubeView,
    editCube,
    deleteCube
}