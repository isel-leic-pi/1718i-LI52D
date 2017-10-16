'use strict'

const req = require('request')

module.exports = {
    getLeagues,
    getLeagueTable,
    getTeam
}

function getLeagues(cb) {
    const path = 'http://api.football-data.org/v1/soccerseasons'
    req(path, (err, res, data) => {
        if(err) return cb(err)
        const obj = JSON.parse(data.toString())
        cb(null, obj)
    })
}

function getLeagueTable(leagueId, cb) {
    const path = `http://api.football-data.org/v1/soccerseasons/${leagueId}/leagueTable`
    req(path, (err, res, data) => {
        if(err) return cb(err)
        const obj = JSON.parse(data.toString())
        cb(null, obj.standing)
    })
}

function getTeam(teamId, cb) {
    const path = 'http://api.football-data.org/v1/teams/' + teamId
    req(path, (err, res, data) => {
        if(err) return cb(err)
        const obj = JSON.parse(data.toString())
        cb(null, obj)
    })
}