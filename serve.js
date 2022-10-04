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

app.get("/anime/house", (req, res) => {
    // array of starter fruits
    const startAnime = [
      { name: "Goku", show: "Dragon ball Z", doesHeSolo: true },
      { name: "Saitima", show: "One punch man", doesHeSolo: true},
      { name: "hinata", show: "Naruto", doesHeSolo: false },
    ]
  
    // Delete all fruits
    Anime.deleteMany({}).then((data) => {
      // Seed Starter Fruits
      Anime.create(startAnime)
        .then((data) => {
        // send created fruits as response to confirm creation
          res.json(data)
        })
    })
  })


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))





