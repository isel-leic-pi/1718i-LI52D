const http = require('http')
const url = require('url')
const fs = require('fs')
const hbs = require('handlebars')
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
const routes = {
    'leagues': {
        action: foot.getLeagues,
        view: view('./views/leaguesView.hbs')
    },
    'leagueTable': {
        action: foot.getLeagueTable,
        view: view('./views/leagueTableView.hbs')
    },
    'team': {
        action: foot.getTeam,
        view: view('./views/teamView.hbs')
    }
}

function router(req, resp) {
    const urlObj = url.parse(req.url, true)
    const actionName = urlObj.pathname.substring(1)
    if(routes[actionName] != undefined) {
        const action = routes[actionName].action
        const view = routes[actionName].view
        const parameters = mapParameters(urlObj.query, action)
        parameters.push(actionCallback(resp, view))
        action.apply(this, parameters)
    } else {
        resp.statusCode = 404 // Resource Not Found
        resp.end()
    }
}

/*
 * 2. Representação: Obter uma String com a representação HTML do recurso.
 * 3. Envio da resposta: statusCode 200 + setHeader() + end()
 */
function actionCallback(resp, view) {
    return (err, obj) => {
        let data
        if(err) {
            data = err.message
            resp.statusCode = 500
        } else {
            data =  view(obj)
            resp.statusCode = 200
        }
        resp.setHeader('Content-Type', 'text/html')
        resp.end(data)
    }
}


/**
 * Returns template Handlebars.
 * 
 * @param {*} viewPath Path for handlebars template source.
 */
function view(viewPath) {
    const viewSrc = fs.readFileSync(viewPath).toString()
    return hbs.compile(viewSrc)
}

function mapParameters(query,func){
    const funcName = func.toString()
    const formalParams = func.toString()
            .substring(funcName.indexOf('(')+1,funcName.indexOf(')'))
            .replace(/\s/g, '')
            .split(',')
    formalParams.pop() // remove callback from formal parameters
    if(formalParams.length != Object.keys(query).length){
        return
    }
    const actualParams = []
    for(i = 0; i < formalParams.length; ++i){
        const param = formalParams[i]
        if(!Object.prototype.hasOwnProperty.call(query, param)){
            return
        }
        actualParams.push(query[param])
    }
    return actualParams
}
