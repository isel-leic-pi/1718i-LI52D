'use strict'

const req = require('sync-request')

function getSync(leagueId) {
    const path = `http://api.football-data.org/v1/soccerseasons/${leagueId}/leagueTable`
    const resp = req('GET', path)
    const league = JSON.parse(resp.getBody().toString())
    console.log(league.leagueCaption);
    console.log(league.standing[0].teamName);
}

getSync(426)
getSync(430)
getSync(436)