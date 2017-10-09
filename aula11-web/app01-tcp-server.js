'use strict'

const net = require('net')
const strftime = require('strftime')

/*
const server = net.createServer(socket => {
    const now = new Date()
    const dt = strftime('%F %T', now)
    socket.write(dt)
    socket.end()
})
*/

const server = net.createServer(socket => {
    socket.write(timeString())
    socket.on('data', data => {
        const str = data.toString()
        socket.write(timeString())
    })
})

server.listen(3000)
console.log('TCP Server listneing on port 3000')

function timeString() {
    const now = new Date()
    return  strftime('%F %T', now)
}