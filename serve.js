require("dotenv").config() 
const express = require("express") 


const path = require("path")
const AnimeRouter = require('./controllers/animeControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


const app = express()


middleware(app)


app.get("/", (req, res) => {
    res.send("Your server is running, better go out and catch it")

})


app.use('/fruits', AnimeRouter)
app.use('/users', UserRouter)


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

