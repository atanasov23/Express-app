const mongoose = require('mongoose');

const cubeShema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        
        type: String,
        required: true,
        
    },
    difficultyLevel: {
        type: String,
        required: true,
    },
    accessory: [{
        type: mongoose.Types.ObjectId,
        ref: 'accessory'
    }],
    ownerCube: [{
        type: mongoose.Types.ObjectId,
        ref: 'register'
    }]

});

const cube = mongoose.model('cube', cubeShema);

module.exports = cube;

