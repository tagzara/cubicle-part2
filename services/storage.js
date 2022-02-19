const fs = require('fs/promises');
const uniqid = require('uniqid');
const Cube = require('../models/Cube.js');

let data = {};


async function init() {
    try{
        data = JSON.parse(await fs.readFile('./models/data.json'));
    } catch (err) {
        console.error('Error readin database')
    }

    return (req, res, next) => {
        req.storage = {
            getAll, 
            getById,
            create
        };
        next();
    }
}

async function getAll(query) {
    let cubes = Object
    .entries(data)
    .map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if (query.from) {
        cubes = cubes.filter(c => c.difficulty >= Number(query.from));
    }
    if (query.to) {
        cubes = cubes.filter(c => c.difficulty <= Number(query.to));
    }

    return cubes;        
}

async function getById(id) {
    const cube = data[id];
    if (cube) {
        return Object.assign({}, { id }, cube);
    } else {
        return undefined;
    }
}

async function create(cube) {
   const record = new Cube(cube);
   return record.save();
}

async function edit(id, cube) {
    if (!data[id]) {
        throw new ReferenceError('No such ID in database!');
    }
    data[id] = cube;

   await persist();
}

async function persist() {
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));
    } catch {
        console.error('Error writing out database');
    }
}

module.exports = {
    init, 
    getAll,
    getById,
    create,
    edit
}