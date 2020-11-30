const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = []

var product = new Schema({
    title: String,
    subtitle: String,
    author: String,
    publishing_company: String,
    category: String,
    time_up_load: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        default: 0.0
    },
    price: String,
    imageURLs: {
        type: [String],
        default: ['']
    },
    owner: String
})


module.exports = mongoose.model('Product', product)