'use strict'

const fs = require('fs')
/**
 * Array of User objects
 */
const dbUsers = require('../data/usersDb.json')

module.exports = {
    'find': find,
    'authenticate': authenticate,
    'save': save
}

function find(username, cb) {
    const user = dbUsers.find(item => item.username == username)
    cb(null, user)
}

/**
 * @param String username 
 * @param String passwd 
 * @param Function cb callback (err, user, info) => void. If user exists
 * but credentials fail then calls cb with undefined user and an info message.
 */
function authenticate(username, passwd, cb) {
    const user = dbUsers.find(item => item.username == username)
    if(!user) return cb(null, null, `User ${username} does not exists`)
    if(passwd != user.password) return cb(null, null, 'Invalid password')
    cb(null, user)
}

function save() {
    fs.writeFile('./data/usersDb.json', JSON.stringify(dbUsers))
}