const req = require('sync-request')

const content = req('GET', 'http://api.football-data.org/v1/soccerseasons/445/leagueTable')
const leagueTableJson = content.getBody('utf8')
const leagueTable = JSON.parse(leagueTableJson) // String Json --> Objecto

leagueTable
  .standing
  .slice(0,10)
  .forEach(std => console.log(`${std.position}: ${std.points} ${std.teamName}`))
