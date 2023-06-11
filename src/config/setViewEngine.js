const handlebars = require('express-handlebars');
const path = require('path');

function setViewEngine(app) {

    app.engine('handlebars', handlebars.engine());

    app.set('view engine', 'handlebars');

    //app.set('views', path.join('C:/Users/atana/Desktop/Softuni задачи/JS Back-End/express app/src/views'));

    app.set('views', __dirname + '/views');
}

module.exports = setViewEngine;



