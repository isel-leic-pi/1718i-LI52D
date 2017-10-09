'use strict'

const net = require('http')
const strftime = require('strftime')

const server = net.createServer((req, res) => {
    const dt = timeString()
    // res.setHeader('Content-Type', 'text/html')
    res.write(`<html><body><h1>${dt}</h1></body></html>`)
    res.statusCode = 200
    res.end()
})

server.listen(3000)
console.log('TCP Server listening on port 3000')

function timeString() {
    const now = new Date()
    return  strftime('%F %T', now)
}