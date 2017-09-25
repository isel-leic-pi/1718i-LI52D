'use strict'

module.exports = {
    foo,
    bar
}

function foo() {
    console.log('I am module2::foo')
}

function bar() {
    console.log('I am module2::bar')
}

/*
 * NÃO exportada. Para uso privado
 */ 
function xpto() {
    console.log('I am module2::bar')
}