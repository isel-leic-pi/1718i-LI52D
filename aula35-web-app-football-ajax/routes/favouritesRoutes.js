const userService = require('./../services/userService')
const express = require('express')
const router = express.Router()
module.exports = router

router.post('/favourites', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    const league = {
        id: req.body.league,
        caption: req.body.caption
    }
    req.user.leagues.push(league)
    const ctx = { layout: false }
    Object.assign(ctx, league)
    userService.save(req.user, (err) => {
        if(err) return next(err)
        res.render('partials/favouriteLeague', ctx)
    })
})
