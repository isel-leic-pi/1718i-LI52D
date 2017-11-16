const express = require('express')
const router = express.Router()
const userService = require('./userService')
const passport = require('passport')

module.exports = router

router.get('/login', (req, res) => {
    res.render('login', {layout: false})
})

router.post('/login', (req, res, next) => {
    userService.authenticate(req.body.username, req.body.password, (err, user, info) => {
        if(err) return next(err)
        if(info) return next(new Error(info))
        req.logIn(user, (err) => {
            if(err) return next(err)
            res.redirect('/leagues')
        })
    })
})

router.use((req, res, next) => {
    if(req.user) res.locals.favourites = req.user.leagues
    else res.locals.favourites = []
    next()
})

passport.serializeUser(function(user, cb) {
    cb(null, user.username)
  })
  
passport.deserializeUser(function(username, cb) {
    userService.find(username, cb)
})

  