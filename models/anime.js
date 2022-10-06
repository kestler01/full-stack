
const mongoose = require('./connection')

const User = require('./user')
const { Schema, model } = mongoose


const animeSchema = new Schema({
    name: String,
    show: String,
    doesHeSolo: Boolean,
    owner:{ 
        type: Schema.Types.ObjectId,
        ref: 'User'}

    }, { timestamps: true })


const Anime = model("Anime", animeSchema)


module.exports = Anime