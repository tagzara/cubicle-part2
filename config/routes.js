const { about } = require('../controllers/about.js');
const { attach, attachPost } = require('../controllers/details.js');
const { post: commentPost } = require('../controllers/comments.js');
const { errorPage } = require('../controllers/errorPage.js');
const { createAccessory, accessoryPost } = require('../controllers/accessory.js');
const productController = require('../controllers/productController.js');

module.exports = (app) => {
    app.get('/', (req, res) => res.redirect('/products'));
    app.get('/about', about);

    app.use('/products', productController);

    app.post('/comments/:cubeId/create', commentPost);

    app.get('/accessory/create', createAccessory);
    app.post('/accessory/create', accessoryPost);
    app.get('/details/:id/attach', attach);
    app.post('/details/:cubeId/attach', attachPost);

    app.all('*', errorPage);
}