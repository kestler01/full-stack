const express = require("express")
const Anime = require("../models/anime")

const router = express.Router()

// router.post("/:animeId", (req, res) => {
//     const animeId = req.params.animeId

//     if (req.session.loggedIn) {
//         req.body.author = req.session.userId
//     } else {
//         res.sendStatus(401)
//     }
//     Anime.findById(animeId)
//         .then(anime => {
//             anime.comments.push(req.body)
//             return anime.save()
//         })
//         .then(anime => {
//             res.status(200).json({ anime: anime })
//         })
//         .catch(error => console.log(error))
// })

router.get('/', (req, res) => {
    res.send('comment controllers')
})


// router.delete('/delete/:animeId/:commId', (req, res) => {
//     const animeId = req.params.animeId 
//     const commId = req.params.commId
//     Anime.findById(animeId)
//         .then(anime => {
//             const theComment = anime.comments.id(commId)
//             console.log('this is the comment that was found', theComment)
//             if (req.session.loggedIn) {
//                 if (theComment.author == req.session.userId) {
//                     theComment.remove()
//                     anime.save()
//                     res.sendStatus(204)
//                 } else {
//                     res.sendStatus(401)
//                 }
//             } else {
//                 res.sendStatus(401)
//             }
//         })
     
//         .catch(error => console.log(error))

// })


module.exports = router