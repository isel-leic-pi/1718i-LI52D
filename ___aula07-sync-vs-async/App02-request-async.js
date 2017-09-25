'use strict'

const req = require('request')

function getAsync(leagueId) {
    const path = `http://api.football-data.org/v1/soccerseasons/${leagueId}/leagueTable`
    req(path, getAsyncCallback)
}   

function getAsyncCallback(err, resp, body){
    if(err) throw err
    const league = JSON.parse(body.toString())
    console.log(league.leagueCaption);
    console.log(league.standing[0].teamName);
}

getAsync(426)
getAsync(430)
getAsync(436)