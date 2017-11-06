const connect = require('../aula22-connect')
const router = connect()
const foot = require('./footballService')()

module.exports = router

router.use('/leagues', (req, resp) => {
    foot.getLeagues((err, data) => {
        if(err) return sendError(resp, err.message)
        resp.send('./views/leaguesView.hbs', data)
    })
})
router.use('/leagueTable', (req, resp) => {
    foot.getLeagueTable(req.query.leagueId, (err, data) => {
        if(err) return sendError(resp, err.message)
        resp.send('./views/leagueTableView.hbs', data)
    })
})
router.use('/team', (req, resp) => {
    foot.getTeam(req.query.teamId, (err, data) => {
        if(err) return sendError(resp, err.message)
        resp.send('./views/teamView.hbs', data)
    })
 })

 function sendError(resp, msg) {
    resp.statusCode = 500
    resp.setHeader('Content-Type', 'text/html')
    resp.end(msg)
}
