const Cube = require('../models/Cube.js');

async function init() {

    return (req, res, next) => {
        req.storage = {
            getAll, 
            getById,
            create,
            edit
        };
        next();
    }
}

async function getAll(query) {
    const options = {};
    
    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' };
    }
    if (query.from) {
        options.difficulty = { $gte: Number(query.from) };
    }
    if (query.to) {
        options.difficulty = options.difficulty || {};
        options.difficulty.$lte = Number(query.to);
    }


    const cubes = Cube.find(options).lean();

    return cubes;        
}

async function getById(id) {
    const cube = await Cube.findById(id).lean();
    if (cube) {
        return cube;
    } else {
        return undefined;
    }
}

async function create(cube) {
   const record = new Cube(cube);
   return record.save();
}

async function edit(id, cube) {
    const existingCube = await Cube.findById(id);

    if (!existingCube) {
        throw new ReferenceError('No such ID in database!');
    }
    
    Object.assign(existingCube, cube);
    return existingCube.save();
}

module.exports = {
    init, 
    getAll,
    getById,
    create,
    edit
}