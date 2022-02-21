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
   const cubes = Cube.find({}).lean();

    /*
    if (query.search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if (query.from) {
        cubes = cubes.filter(c => c.difficulty >= Number(query.from));
    }
    if (query.to) {
        cubes = cubes.filter(c => c.difficulty <= Number(query.to));
    }
*/
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