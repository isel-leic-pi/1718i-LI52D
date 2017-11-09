'use strict'

const Team = require('./model/Team')

module.exports = init

function init(dataSource) {
    const req = dataSource
        ? dataSource
        : require('request')
        
    return {
        getLeagues,
        getLeagueTable,
        getTeam
    }
   
    function getLeagues(cb) {
        const path = 'http://api.football-data.org/v1/soccerseasons'
        reqAsJson(path, cb)
    }
    
    function getLeagueTable(leagueId, cb) {
        const path = `http://api.football-data.org/v1/soccerseasons/${leagueId}/leagueTable`
        reqAsJson(path, (err, obj) => {
            if(err) return cb(err)
            obj.standing.forEach(item => {
                const parts = item._links.team.href.split('/')
                item.id = parts[parts.length - 1]
            })
            cb(null, obj)
        })
    }
    
    function getTeam(teamId, cb) {
        const pathTeamDetails = 'http://api.football-data.org/v1/teams/' + teamId
        const pathPlayers = pathTeamDetails + '/players'
        reqAsJson(pathTeamDetails, (err, team) => {
            if(err) return cb(err)
            reqAsJson(pathPlayers, (err, res) =>{
                if(err) return cb(err)
                cb(null, new Team(team, res))
            })
        })
    }

    function reqAsJson(path,cb) {
        req(path, (err, res, data) => {
            if(err) return cb(err)
            const obj = JSON.parse(data.toString())
            cb(null, obj)
        })
    }
}

