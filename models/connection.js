/////////////////////////////////////////////
// import dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const mongoose = require("mongoose") // import mongoose

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// this is where we will set up our inputs for our database connect function
const DATABASE_URL = process.env.DATABASE_URL
const DEPLOYED_URL = process.env.DEPLOYED_URL
const CONFIG = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}
mongoose.connect(DEPLOYED_URL, CONFIG)
// mongoose.connect(process.env.DATABASE_URL, {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true,
// })

// save the connection in a variable
const db = mongoose.connection

// tell mongoose what to do with certain events
// opens, disconnects, errors
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log("An error occurred: \n", error))

/////////////////////////////////////////////
// export our connection
/////////////////////////////////////////////
module.exports = mongoose