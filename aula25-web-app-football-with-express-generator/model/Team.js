module.exports = Team

function Team(teamDetails, playersDetails) {
    this.name = teamDetails.name
    this.shortName = teamDetails.shortName
    this.crestUrl = teamDetails.crestUrl
    this.players = playersDetails.players
}