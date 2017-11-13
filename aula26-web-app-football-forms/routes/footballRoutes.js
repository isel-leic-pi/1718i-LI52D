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
router.get('/leagues/:id/table', (req, resp, next) => {
    foot.getLeagueTable(req.params.id, (err, data) => {
        if(err) return next(err)
        data.leagueId = req.params.id
        resp.render('leagueTableView', data)
    })
})
router.get('/leagues/:id/table/:teamId', (req, resp, next) => {
    foot.getTeam(req.params.teamId, (err, data) => {
        if(err) return next(err)
        resp.render('teamView', data)
    })
 })
