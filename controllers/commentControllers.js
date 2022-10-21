////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Anime = require("../models/anime")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post("/:animeId", (req, res) => {
    const animeId = req.params.animeId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific anime
    Anime.findById(animeId)
        // do something if it works
        //  --> send a success response status and maybe the comment? maybe the anime?
        .then(anime => {
            // push the comment into the anime.comments array
            anime.comments.push(req.body)
            // we need to save the anime
            return anime.save()
        })
        .then(anime => {
            // res.status(200).json({ anime: anime })
            res.redirect(`/animes/${anime.id}`)
        })
        // do something else if it doesn't work
        //  --> send some kind of error depending on what went wrong
        .catch(err => res.redirect(`/error?error=${err}`))
})
// no update ?
// DELETE
// only the author of the comment can delete it
router.delete('/delete/:animeId/:commId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const animeId = req.params.animeId 
    const commId = req.params.commId
    // get the anime
    Anime.findById(animeId)
        .then(anime => {
            // get the comment
            // subdocs have a built in method that you can use to access specific subdocuments when you need to.
            // this built in method is called .id()
            const theComment = anime.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theComment.author == req.session.userId) { // consolidate this block because the errors are the same 
                    // find some way to remove the comment
                    // here's another built in method
                    theComment.remove()
                    anime.save()
                    res.redirect(`/animes/${anime.id}`)
                    // return the saved anime
                    // return anime.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router