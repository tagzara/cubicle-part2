const productService = require('../services/products.js');
const accessoryService = require('../services/accessory.js');

async function init() {

    return (req, res, next) => {
        const storage = Object.assign({}, productService, accessoryService);
        req.storage = storage;
        next();
    }
}

module.exports = init;