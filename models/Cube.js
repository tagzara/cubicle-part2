const { Schema, model } = require('mongoose');

const STRING_PATTERN = /^[a-zA-Z0-9 ]+$/;
const IMAGE_PATTERN = /^https?:\/\//;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Cube name is required'],
        minlength: [5, 'Cube name must be at least 5 characters long'],
        match: [STRING_PATTERN, 'Cube name may contains only latin alphanumeric characters']
    },
    description: { type: String, required: true, minlength: 20, maxlength: 500, match: STRING_PATTERN },
    imageUrl: { type: String, required: true, match: IMAGE_PATTERN },
    difficulty: { type: Number, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Cube', schema);