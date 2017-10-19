'use strict'

const fs = require('fs')

const endpoints = {
    'http://api.football-data.org/v1/teams/73': 
        fs.readFileSync('./test/team73.json').toString(),
    'http://api.football-data.org/v1/teams/73/players': 
        fs.readFileSync('./test/players73.json').toString(),
}

const foot = require('./../footballService')(reqToFile)

function reqToFile(path, cb) {
    const data = endpoints[path]
    if(!data) return cb(new Error('No mock file for path ' + path))
    cb(null, null, data)
}

module.exports = {
    testGetTeam
}

function testGetTeam(test) {
    foot.getTeam(73, (err, team) => {
        if(err) 
            test.ifError(err)
        else {
            test.equal(team.name, 'Tottenham Hotspur FC')
            test.equal(team.shortName, 'Spurs')
            test.equal(team.players.length, 24)
            test.equal(team.players[2].name, 'Toby Alderweireld')
        }
        test.done()
    })
}