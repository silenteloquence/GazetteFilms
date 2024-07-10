const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    released: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Films', filmSchema);