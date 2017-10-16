const http = require('http')
const url = require('url')
const foot = require('./footballService')
const port = 3000

/**
 * Init HTTP server
 */
const server = http.createServer(router)
server.listen(port)

/**
 * Endpoints paths
 */
const leagues = '/leagues'
const leagueTable = '/leagueTable' // query-string ?leagueId=...
const team = '/team'   // query-string ?teamId=...

function router(req, resp) {
    const urlObj = url.parse(req.url, true)
    let action
    if (urlObj.pathname == leagues) {
        action = cb => foot.getLeagues(cb)
    }
    else if (urlObj.pathname == leagueTable) {
        action = cb => foot.getLeagueTable(urlObj.query.leagueId, cb)
    }
    else if (urlObj.pathname == team) {
        action = cb => 
            foot.getTeam(urlObj.query.teamId, cb)
    }
    if(action != undefined) {
        /**
         * 1. Call action
         * 2. Representação: Obter uma String com a representação HTML do recurso.
         * 3. Envio da resposta: statusCode 200 + setHeader() + end()
         */
        const obj = action((err, obj)=> {
            let data
            if(err) {
                data = err.message
                resp.statusCode = 500
            } else {
                data = htmlify(obj)
                resp.statusCode = 200
            }
            resp.setHeader('Content-Type', 'text/html')
            resp.end(data)
        })
    } else {
        resp.statusCode = 404 // Resource Not Found
        resp.end()
    }
}

function htmlify(obj) {
    let str = ''
    for(let prop in obj) {
        const val = obj[prop]
        str += `<li>${prop}: ${val}</li>`
    }
    return `<ul>${str}</ul>`
}


