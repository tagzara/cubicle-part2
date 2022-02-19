const { catalog } = require('./controllers/catalog.js');
const { about } = require('./controllers/about.js');
const { details } = require('./controllers/details.js');
const { create, post: createPost } = require('./controllers/create.js');
const { errorPage } = require('./controllers/errorPage.js');
const { edit, post: editPost } = require('./controllers/edit.js');

module.exports = (app) => {
    app.get('/', catalog);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.get('/create', create);
    app.post('/create', createPost);
    app.get('/edit/:id', edit);
    app.post('/edit/:id', editPost);

    app.all('*', errorPage);
}