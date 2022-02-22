const Cube = require('../models/Cube.js');
const Comment = require('../models/Comment.js');
const Accessory = require('../models/Accessory.js');

async function init() {

    return (req, res, next) => {
        req.storage = {
            getAll, 
            getById,
            create,
            edit, 
            createComment,
            createAccessory,
            getAllAccessories,
            attachStickers
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
    const cube = await Cube.findById(id).populate('comments').populate('accessories').lean();
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

async function createComment(cubeId, comment) {
    const cube = await Cube.findById(cubeId);

    if (!cube) {
        throw new ReferenceError('No such ID in database!');
    }

    const newComment = new Comment(comment);
    await newComment.save();

    cube.comments.push(newComment);
    await cube.save();
}

async function getAllAccessories(existing) {
    return Accessory.find({ _id: { $nin: existing } }).lean();
}

async function createAccessory(accessory) {
    const record = new Accessory(accessory);
    return record.save();
}

async function attachStickers(cubeId, stickerId) {
    const cube = await Cube.findById(cubeId);
    const sticker = await Accessory.findById(stickerId);

    if (!cube || !sticker) {
        throw new ReferenceError('No such ID in database');
    }

    cube.accessories.push(sticker);
    return cube.save();
}

module.exports = {
    init, 
    getAll,
    getById,
    create,
    edit, 
    createComment,
    createAccessory, 
    getAllAccessories,
    attachStickers
}