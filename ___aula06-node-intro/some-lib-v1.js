'use strict'

module.exports = {
    foo,
    bar
}

/* <=>
module.exports = {
    'foo': foo,
    'bar': bar
}
*/

function foo() {
    console.log('I am foo')
}

function bar() {
    console.log('I am bar')
}
