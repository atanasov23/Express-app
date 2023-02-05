const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        min: 6,
    },

    password: {
        type: String,
        required: true,
        min: 6,
    },
});

const register = mongoose.model('register', registerSchema);

module.exports = register; 

