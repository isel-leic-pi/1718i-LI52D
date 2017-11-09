const connect = require('connect')
const router = connect()
const foot = require('./footballService')()

module.exports = router

router.use('/leagues', (req, resp, next) => {
    foot.getLeagues((err, data) => {
        if(err) return next(err)
        resp.send('./views/leaguesView.hbs', data)
    })
})
router.use('/leagueTable', (req, resp, next) => {
    foot.getLeagueTable(req.query.leagueId, (err, data) => {
        if(err) return next(err)
        resp.send('./views/leagueTableView.hbs', data)
    })
})
router.use('/team', (req, resp, next) => {
    foot.getTeam(req.query.teamId, (err, data) => {
        if(err) return next(err)
        resp.send('./views/teamView.hbs', data)
    })
 })
