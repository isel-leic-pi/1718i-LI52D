const express = require('express')
const router = express.Router()
const userService = require('./../services/userService')
const passport = require('passport')

module.exports = router

/**
 * => Resposta a um pedido da página de /login
 * => Insucesso na validação das credenciais => retorna /login
 */
router.get('/login', (req, res) => {
    const ctx = { layout: false }
    const msg = req.flash('loginError')
    if(msg)  ctx.loginError = {message: msg}
    res.render('login', ctx)
})

router.post('/login', (req, res, next) => {
    userService.authenticate(req.body.username, req.body.password, (err, user, info) => {
        if(err) return next(err)
        if(info) {
            // gravar mensagem de erro
            req.flash('loginError', info)
            return res.redirect('/login')
        }
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

  