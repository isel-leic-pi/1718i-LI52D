'use strict'

const req = require('request')

function getLeagues(cb) {
    const path = 'http://api.football-data.org/v1/soccerseasons'
    req(path, (err, res, data) => {
        if(err) return cb(err)
        const obj = JSON.parse(data.toString())
        cb(null, obj)
    })
}

function getLeagueTable(leagueId, cb) {
}

function getTeam(teamId, cb) {
}