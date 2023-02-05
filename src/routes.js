const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authContoller');
const router = require('express').Router();
const auth = require('./middlewares/authMiddlewares');

router.get('/', homeController.homeView);

router.get('/about', homeController.aboutPage);

router.get('/create', auth.isLogged, cubeController.createView);

router.post('/created', cubeController.addCube);

router.get('/details/:id', cubeController.showDescription);

router.get('/create/accessory', accessoryController.addAccessoryView);

router.post('/create/accessory/added', accessoryController.addAccessory);

router.get('/cube/attach/:id', accessoryController.cubeAttachView);

router.post('/cube/attach/:id', accessoryController.attachAccessory);

router.get('/login', authController.loginView);

router.get('/register', authController.registerView);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/edit/:id', cubeController.editCubeView);

router.post('/edit/:id', cubeController.editCube);

router.get('/delete', cubeController.deleteCubeView);

router.post('/delete', cubeController.deleteCube);

module.exports = router;




