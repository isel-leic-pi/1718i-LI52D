'use strict'

const foot = require('./../footballService')

module.exports = {
    testGetTeam
}

function testGetTeam(test) {
    foot.getTeam(73, (err, team) => {
        if(err) 
            test.ifError(err)
        else {
            test.equal(team.name, 'Tottenham Hotspur FC')
            test.equal(team.code, 'THFC')
        }
        test.done()
    })
}