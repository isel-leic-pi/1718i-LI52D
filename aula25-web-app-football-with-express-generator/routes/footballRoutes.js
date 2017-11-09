const express = require('express')
const router = express.Router()
const foot = require('./footballService')()

module.exports = router

router.get('/leagues', (req, resp, next) => {
    foot.getLeagues((err, data) => {
        if(err) return next(err)
        resp.render('leaguesView', data)
    })
})
router.get('/leagueTable', (req, resp, next) => {
    foot.getLeagueTable(req.query.leagueId, (err, data) => {
        if(err) return next(err)
        resp.render('leagueTableView', data)
    })
})
router.get('/team', (req, resp, next) => {
    foot.getTeam(req.query.teamId, (err, data) => {
        if(err) return next(err)
        resp.render('teamView', data)
    })
 })
