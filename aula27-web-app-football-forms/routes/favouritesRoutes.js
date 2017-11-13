const express = require('express')
const router = express.Router()

module.exports = router

const favourites = [
    {
        leagueId: 445,
        caption: 'Premier League 2017/18'
    },
    {
        leagueId: 455,
        caption: 'La Liga 2017/18'
    },
]

router.use((req, res, next) => {
    res.locals.favourites = favourites
    next()
})

router.post('/favourites', (req, res, next) => {
    favourites.push({
        leagueId: req.query.league,
        caption: req.query.caption
    })
    res.redirect('/leagues')
})
