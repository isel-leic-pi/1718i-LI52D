const http = require('http')
const url = require('url')
const fs = require('fs')
const hbs = require('handlebars')
const foot = require('./footballService')()
const connect = require('../aula22-connect')
const port = 3000

/**
 * Init HTTP server
 */
const router = connect() // Init an empty pipeline of Middlewares
const server = http.createServer(router)
server.listen(port)

/**
 * Endpoints paths
 */
 router.use((req, resp, next) => {
    const urlObj = url.parse(req.url, true)
    req.query = urlObj.query
    next()
 })
 router.use('/leagues', (req, resp) => {
    foot.getLeagues((err, data) => {
        if(err) return sendError(resp, err.message)
        const html = view('./views/leaguesView.hbs')(data)
        resp.setHeader('Content-Type', 'text/html')
        resp.end(html)
    })
})
router.use('/leagueTable', (req, resp) => {
    foot.getLeagueTable(req.query.leagueId, (err, data) => {
        if(err) return sendError(resp, err.message)
        const html = view('./views/leagueTableView.hbs')(data)
        resp.setHeader('Content-Type', 'text/html')
        resp.end(html)
    })
})
router.use('/team', (req, resp) => {
    foot.getTeam(req.query.teamId, (err, data) => {
        if(err) return sendError(resp, err.message)
        const html = view('./views/teamView.hbs')(data)
        resp.setHeader('Content-Type', 'text/html')
        resp.end(html)
    })
 })
router.use((req, resp) => {
    resp.statusCode = 404 // Resource Not Found
    resp.end()
})
 
function sendError(resp, msg) {
    resp.statusCode = 500
    resp.setHeader('Content-Type', 'text/html')
    resp.end(msg)
}


/**
 * Returns template Handlebars.
 * 
 * @param {*} viewPath Path for handlebars template source.
 */
function view(viewPath) {
    if(!view.paths) view.paths = {}
    if(view.paths[viewPath]) return view.paths[viewPath]
    const viewSrc = fs.readFileSync(viewPath).toString()
    const template = hbs.compile(viewSrc)
    view.paths[viewPath] = template
    return template
}
