require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 


const Anime = require('./models/anime')

const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log("An error occurred: \n", error))

const app = express()

app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public"))
app.use(express.json()) 

app.get("/", (req, res) => {
    res.send("Your server is running, better go out and catch it")
})

app.get("/animes/house", (req, res) => {

    const startAnime = [
      { name: "Goku", show: "Dragon ball Z", doesHeSolo: true },
      { name: "Saitima", show: "One punch man", doesHeSolo: true},
      { name: "hinata", show: "Naruto", doesHeSolo: false },
    ]

    Anime.deleteMany({})
    .then(() => {
      Anime.create(startAnime)
        .then((data) => {
          res.json(data)
        })
    })
  })

  app.get("/animes", (req, res) => {
    Anime.find({})
        .then(animes => {
            res.json({ animes: animes })
        })
        .catch(err => console.log(err))
})

  app.post("/animes", (req, res) => {
    Anime.create(req.body)
      .then((anime) => {
        res.status(201).json({ anime: anime.toObject() })
      })
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
  })

  app.put("/animes/:id", (req, res) => {
    const id = req.params.id
    
    Anime.findByIdAndUpdate(id, req.body, { new: true })
        .then(anime => {
            console.log('the anime has been update', anime)

            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

app.get("/animes/:id", (req, res) => {
    // console.log("I hit the update route", req.params.id)
    const id = req.params.id
    Anime.findById(id)
        .then(anime => {
          res.json({anime: anime})
            
        })
        .catch(err => console.log(err))
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))





