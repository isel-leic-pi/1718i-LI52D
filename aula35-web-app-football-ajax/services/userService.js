'use strict'

/**
 * Array of User objects
 */
const dbUsers = 'http://127.0.0.1:5984/football'
const request = require('request')

module.exports = {
    'find': find,
    'authenticate': authenticate,
    'save': save
}

function find(username, cb) {
    const path = dbUsers + '/' + username
    request(path, (err, res, body) => {
        if(err) return cb(err)
        cb(null, JSON.parse(body))
    })
}

/**
 * @param String username 
 * @param String passwd 
 * @param Function cb callback (err, user, info) => void. If user exists
 * but credentials fail then calls cb with undefined user and an info message.
 */
function authenticate(username, passwd, cb) {
    const path = dbUsers + '/' + username
    request(path, (err, res, body) => {
        if(err) return cb(err)
        if(res.statusCode != 200) return cb(null, null, `User ${username} does not exists`)
        const user = JSON.parse(body)
        if(passwd != user.password) return cb(null, null, 'Invalid password')
        cb(null, user)
    })
}

function save(user, cb) {
    const path = dbUsers + '/' + user.username
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user)
    }
    request(path, options, (err, res, body) => {
        if(err) return cb(err)
        cb()
    })
}