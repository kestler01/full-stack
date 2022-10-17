///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Anime = require('./anime')

// Here, we're going to set up a seed script
// this will seed our database for us, so we have some starting resources
// This script will be run, with the command in the terminal `npm run seed`


///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection

db.on('open', () => {
    // bring in the array of starter animes
    const startAnimes = [
        { name: "Goku", anime: "Dragon Ball Z", doesHeSolo: true },
        { name: "Naruto", anime: "Naruto", doesHeSolo: true },
        { name: "Luffy", anime: "One Piece", doesHeSolo: true },
        { name: "Saitama", anime: "One Punch Man", doesHeSolo: true },
        { name: "Gon", anime: "HunterxHunter", doesHeSolo: false},
    ]

    // delete all the existing animes
    Anime.deleteMany({ owner: null })
        .then(deletedAnimes => {
            console.log('this is what .deleteMany returns', deletedAnimes)

            // create a bunch of new animes from startanimes
            Anime.create(startAnimes)
                .then(data => {
                    console.log('here are the newly created animes', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})