'use strict';

const url = require('url')
const http = require('http')
const connect = require('./connect-naif.js')
const pipe = connect()
const PORT = 3000

pipe.use(mw1)
pipe.use(mw2)
pipe.use(mw3)
pipe.use(mw4)

http
    .createServer(pipe)
    .listen(PORT, () => console.log("Listening on port " + PORT));
    

function mw1(req, resp, next) {
    const path = url.parse(req.url, true).pathname
    if(path.startsWith('/dummy/foo')) resp.end("<p>Foo</p>")
    else next()
}

function mw2(req, resp, next) {
    const path = url.parse(req.url, true).pathname
    if(path.startsWith('/dummy/bar')) resp.end("<p>Bar</p>")
    else next()
}

function mw3(req, resp, next) {
    const path = url.parse(req.url, true).pathname
    if(path.startsWith('/dummy')) resp.end("<p>Index</p>")
    else next()
}

function mw4(req, resp) {
    resp.statusCode = 404
    resp.statusMessage = 'Not found';
    resp.end('<h1>Resource not found</h1>')
}
