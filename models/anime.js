const mongoose = require("mongoose") 

const { Schema, model } = mongoose

const animeSchema = new Schema({
    name: String,
    show: String,
    doesHeSolo: Boolean
})

const Anime = model("Anime", animeSchema)

module.exports = Anime