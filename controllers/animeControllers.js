
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


router.put('/:id', (req, res) => {
	const animeId = req.params.id
	Anime.findById(animeId)
    .then(anime => {
      if (anime.owner == req.session.userId) {
        return anime.updateOne(req.body)
      }
    })
		.then(anime => {
			console.log('the updated anime', anime)
			res.sendStatus(204)
		})
		.catch((error) => res.json(error))
})

// delete route
router.delete('/:id', (req, res) => {

	const animeId = req.params.id

	Anime.findById(animeId)
    .then(anime => {
      if (anime.owner == req.session.userId) {
        return anime.deleteOne()
      }
    })
		.then(() => {
			res.sendStatus(204)
		})
		.catch((error) => {
      console.log(error)
			res.json({ error })
		})
})


router.get("/:id", (req, res) => {
    const id = req.params.id

    Anime.findById(id)
        .populate("comments.author", "username")
        .then(anime => {
            res.json({ anime: anime })
        })
        .catch(err => console.log(err))
})



module.exports = router