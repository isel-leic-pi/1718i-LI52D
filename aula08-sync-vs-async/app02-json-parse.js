const req = require('request')

getLeagueLeader(445, getLeagueLeaderCb)
getLeagueLeader(446, getLeagueLeaderCb)
getLeagueLeader(457, getLeagueLeaderCb)

function getLeagueLeaderCb(err, data){
    if(err) throw err
    console.log(`> ${data.league} --- leader: ${data.leader}`)
}

/**
 * param id Football league identifier.
 * param cb callback with arguments (err, leader) whereas leader is an object 
 *          with two string properties: league and leader.
 */ 
function getLeagueLeader(id, cb) {
    const URI = `http://api.football-data.org/v1/soccerseasons/${id}/leagueTable`
    req(URI, (err, resp, data) => {
        if(err) return cb(err)
        const league = JSON.parse(data.toString())
        const leader =  {
            'league': league.leagueCaption,
            'leader': league.standing[0].teamName
        }
        // return leader // !!!!! SEM NEXO => quem chamou foi o JS Runtime
        cb(null, leader)
    })
    console.log('Requesting...')
}
