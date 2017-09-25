'use strict'

module.exports = function() {
    
    function aux1() {
        console.log('I am aux 1!!!!!')
    }
    function aux2() {
        console.log('I am aux 2!!!!!')
    }
    console.log('I am module 3!!!!!')
    aux1()
    aux2()
    zas()
}

module.exports.zas = zas

function zas() {
    console.log('I am zas!!!!!')
}