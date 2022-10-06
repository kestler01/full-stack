
const mongoose = require('./connection')

const User = require('./user')
const commentSchema = require('./comment')
const { Schema, model } = mongoose


const animeSchema = new Schema({
    name: String,
    show: String,
    doesHeSolo: Boolean,
    owner:{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
        comments: [commentSchema]
    }, { timestamps: true })


const Anime = model("Anime", animeSchema)


module.exports = Anime