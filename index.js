const express = require('express');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');

const { init: storage } = require('./models/storage.js');

start();

async function start() {
    const port = 3000;

    const app = express();

    expressConfig(app);
    routesConfig(app);

    app.use(await storage());
    
    app.listen(port, () => console.log(`Server is listening on ${port}...`));
}