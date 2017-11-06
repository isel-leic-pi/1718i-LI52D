'use strict';

const url = require('url')
const http = require('http')
const connect = require('./connect-naif.js')
const pipe = connect()
const PORT = 3000

pipe.use(mw0)
pipe.use('/dummy/foo', mw1)
pipe.use('/dummy/bar', mw2)
pipe.use('/dummy', mw3)
pipe.use(mw4)

http
    .createServer(pipe)
    .listen(PORT, () => console.log("Listening on port " + PORT));

function mw0(req, resp, next) {
    resp.write("<p>Adding something to the response..</p>")
    next()
}

function mw1(req, resp) {
    resp.end("<p>Foo</p>")
}

function mw2(req, resp) {
    resp.end("<p>Bar</p>")
}

function mw3(req, resp) {
    resp.end("<p>Index</p>")
}

function mw4(req, resp) {
    resp.statusCode = 404
    resp.statusMessage = 'Not found';
    resp.end('<h1>Resource not found</h1>')
}
