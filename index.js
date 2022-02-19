const express = require('express');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');

const { init: storage } = require('./models/storage.js');

start();

async function start() {
    const port = 3000;

    const app = express();

    expressConfig(app);
    app.use(await storage());
    routesConfig(app);
    
    app.listen(port, () => console.log(`Server is listening on ${port}...`));
}