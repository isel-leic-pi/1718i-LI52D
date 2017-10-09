const http = require('http')
const url = require('url')
const timeService = require('./timeService')
const port = 3000

/**
 * Init HTTP server
 */
const server = http.createServer(callback)
server.listen(port)

/**
 * Endpoints paths
 */
const parseTime = '/api/parsetime'
const unixTime = '/api/unixtime'
const dateTime = '/api/datetime'

function callback(req, resp) {
    const urlObj = url.parse(req.url, true)
    let action
    if (urlObj.pathname == parseTime) {
        action = timeService.parsetime
    }
    else if (urlObj.pathname == unixTime) {
        action = timeService.unixtime
    }
    else if (urlObj.pathname == dateTime) {
        action = timeService.datetime
    }
    if(action != undefined) {
        /**
         * 1. Call action
         * 2. Representação: Obter uma String com a representação JSON do recurso.
         * 3. Envio da resposta: statusCode 200 + setHeader() + end()
         */
        const obj = action(urlObj.query.iso)
        const data = JSON.stringify(obj)
        resp.statusCode = 200
        resp.setHeader('Content-Type', 'application/json')
        resp.end(data)
    } else {
        resp.statusCode = 404 // Resource Not Found
        resp.end()
    }
}

