const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({

    name: {

        type: String,
        required: true

    },
    description: {

        type: String,
        required: true

    },
    imageUrl: {

        type: String,
        required: true

    }

});

const accessory = mongoose.model('accessory', accessorySchema);

module.exports = accessory;