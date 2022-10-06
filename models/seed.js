
const mongoose = require('./connection')
const Anime = require('./anime')


const db = mongoose.connection

db.on('open', () => {

    const startAnimes = [
        { name: "Goku", show: "Dragon Ball Z", doesHeSolo: false },
        { name: "Saitima", show: "One Punch Man", doesHeSolo: false },
        { name: "Hinata", show: "Naruto", doesHeSolo: false },
      
    ]

    Anime.deleteMany({})
        .then(deletedAnimes => {
            console.log('this is what .deleteMany returns', deletedAnimes)

            Anime.create(startAnimes)
                .then(data => {
                    console.log('here are the newly created animes', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})