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
const routes = {
    'leagues': foot.getLeagues,
    'leagueTable': foot.getLeagueTable,
    'team': foot.getTeam
}

function router(req, resp) {
    const urlObj = url.parse(req.url, true)
    const action = routes[urlObj.pathname.substring(1)]
    if(action != undefined) {
        const parameters = mapParameters(urlObj.query, action)
        parameters.push(actionCallback(resp))
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
function actionCallback(resp) {
    return (err, obj) => {
        let data
        if(err) {
            data = err.message
            resp.statusCode = 500
        } else {
            data =  obj instanceof Array 
                        ? htmlifyArray(obj)
                        : htmlify(obj)
            resp.statusCode = 200
        }
        resp.setHeader('Content-Type', 'text/html')
        resp.end(data)
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

function htmlifyArray(arr) {
    let strHtml = '<table style="width:100%">'
    strHtml += tableHeader(arr[0])
    arr.forEach(element => strHtml += tableRow(element))
    return strHtml += '</table>'
}

function tableHeader(element) {
    let strRow = ''
    for (let e in element) {
        strRow += '<th>' + e + '</th>'
    }
    return '<tr>' + strRow + '</tr>'
}
function tableRow(element) {
    let strRow= ''
    for (let e in element) {
        strRow += '<td>' + element[e] + '</td>'
    }
    return '<tr>' + strRow + '</tr>'
}
