const req = require('request')

getLeagueLeader(445)
sleepFor(2000)
getLeagueLeader(446)
sleepFor(2000)
getLeagueLeader(457)


function getLeagueLeader(id) {
    const URI = `http://api.football-data.org/v1/soccerseasons/${id}/leagueTable`
    req(URI, getLeagueLeaderAsync)
    console.log('Requesting...')
}

function getLeagueLeaderAsync(err, resp, data) {
    if(err) throw err
    const league = JSON.parse(data.toString())
    console.log(`> ${league.leagueCaption} --- leader: ${league.standing[0].teamName}`)
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}