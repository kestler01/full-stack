
const express = require("express")
const Anime = require("../models/anime")


const router = express.Router()


router.get("/", (req, res) => {

    Anime.find({})
        .then(animes => {

            res.json({ animes: animes })
        })
        .catch(err => console.log(err))
})



router.post('/', (req, res) => {


  req.body.owner = req.session.userId
  console.log('this is req.body before adding owner', req.body)
  Anime.create(req.body)
    .then((anime) => {
      console.log('this was returned from create', anime)
      res.status(201).json({ anime: anime.toObject() })
    })
    .catch((err) => {
      console.log(err)
      res.json({ err })
    })
})


router.put("/:id", (req, res) => {

    const id = req.params.id
    

    Anime.findByIdAndUpdate(id, req.body, { new: true })
        .then(anime => {
            console.log('the anime from update', anime)
  
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


router.delete("/:id", (req, res) => {

    const id = req.params.id

    Anime.findByIdAndRemove(id)
 
        .then(() => {
            res.sendStatus(204)
        })

        .catch(err => res.json(err))
})


router.get("/:id", (req, res) => {
    const id = req.params.id

    Anime.findById(id)
        .then(anime => {
            res.json({ anime: anime })
        })
        .catch(err => console.log(err))
})



module.exports = router