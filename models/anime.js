///////////////////////////////////////////////////////////
// Our schema and model for the fruit resource
///////////////////////////////////////////////////////////
// this is the old mongoose import
// const mongoose = require("mongoose") // import mongoose
const mongoose = require('./connection')
const User = require('./user')// unused import 

// here we'll import our commentSchema
const commentSchema = require('./comment')

// we're going to pull the Schema and model from mongoose
// we'll use a syntax called "destructuring"
const { Schema, model } = mongoose

// fruits schema // what fruits 
const animeSchema = new Schema({ // capitalize our document schemas since they are a JS class
    name: String,
    anime: String,
    doesHeSolo: Boolean,
    owner: {
        // here we can refer to an objectId
        // by declaring that as the type
        type: Schema.Types.ObjectId,
        // this line, tells us to refer to the User model // love descriptive comments, just not when we don't write them ourselves
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

// make the fruit model // what fruit! 
// the model method takes two args
// the first is what we will call our model
// the second is what we will use to build the model
const Anime = model("Anime", animeSchema)

//////////////////////////////////////////////////
// Export our model
//////////////////////////////////////////////////
module.exports = Anime