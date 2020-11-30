const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    title: String,
    subtitle: String,
    imageURLs: String,
    owner: String,
    time_post: Date,
    score: int
})