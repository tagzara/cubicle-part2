const { post: commentPost } = require('../controllers/comments.js');

const productController = require('../controllers/productController.js');
const accessoryController = require('../controllers/accessoryController.js');
const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');

module.exports = (app) => {

    app.use('/products', productController);
    app.use('/accessory', accessoryController);
    app.use('/auth', authController);

    app.post('/comments/:cubeId/create', commentPost);

    app.use('/', homeController);
}