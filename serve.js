require("dotenv").config() 
const express = require("express") 


const path = require("path")
const AnimeRouter = require('./controllers/animeControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')
const router = require("./controllers/userControllers")


const app = express()


middleware(app)


app.get("/", (req, res) => {
    res.send("Your server is running, better go out and catch it")

})
router.get('/', (req, res) => {
    res.send('controller')
})


app.use('/animes', AnimeRouter)
app.use('comments', CommentRouter)
app.use('/users', UserRouter)



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

