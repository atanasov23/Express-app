const accesssory = require('../models/accessoryModel');
const cube = require('../models/cubeModel');

const addAccessoryView = (req, res) => {

    res.render('accessory');

}

const cubeAttachView = async (req, res) => {

    const cubeInfo = await cube.findById(req.params.id).lean();

    const accessories = await accesssory.find({ _id: { $nin: cubeInfo.accessory } }).lean();

    res.render('attach', { cubeInfo, accessories });

}

const addAccessory = (req, res) => {

    const obj = { name, description, imageUrl } = req.body;

    const newAccessory = new accesssory(obj);

    newAccessory.save();

    res.redirect('/');

}

const attachAccessory = async (req, res) => {

    const findCube = await cube.findById(req.params.id);

    findCube.accessory.push(req.body.accessory);

    findCube.save();

    res.redirect('/');

}



module.exports = {
    addAccessoryView,
    addAccessory,
    cubeAttachView,
    attachAccessory
}