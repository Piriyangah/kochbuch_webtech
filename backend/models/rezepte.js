const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    image: String,
    time: String,
});

module.exports = mongoose.model('Rezept', schema);
