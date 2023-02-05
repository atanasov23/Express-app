const express = require('express');
const setViewEngine = require('./config/setViewEngine');
const config = require('./config/configFile');
const router = require('./routes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/authMiddlewares');

mongoose.set('strictQuery', true);

const mongodb = mongoose.connect(config.development.db, (err) => {

    if (err) {

        console.log(err);

    } else {

        console.log('Successful database connection');
    }

});

const app = express();

setViewEngine(app);

app.use(express.static('src/public'));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(auth.authMiddleware);

app.use(router);

app.listen(config.development.port, () => {
    console.log('Server started');
});









