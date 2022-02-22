const { catalog } = require('../controllers/catalog.js');
const { about } = require('../controllers/about.js');
const { details, attach, attachPost } = require('../controllers/details.js');
const { create, post: createPost } = require('../controllers/create.js');
const { post: commentPost } = require('../controllers/comments.js');
const { errorPage } = require('../controllers/errorPage.js');
const { edit, post: editPost } = require('../controllers/edit.js');
const { createAccessory, accessoryPost } = require('../controllers/accessory.js');

module.exports = (app) => {
    app.get('/', catalog);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.get('/create', create);
    app.post('/create', createPost);

    app.get('/edit/:id', edit);
    app.post('/edit/:id', editPost);

    app.post('/comments/:cubeId/create', commentPost);

    app.get('/accessory/create', createAccessory);
    app.post('/accessory/create', accessoryPost);
    app.get('/details/:id/attach', attach);
    app.post('/details/:cubeId/attach', attachPost);

    app.all('*', errorPage);
}