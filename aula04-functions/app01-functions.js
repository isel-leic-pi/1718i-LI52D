'use strict'

function foo(){
    console.log('I am foo')
    console.log('this = ' + this)
    for(let i = 0; i < arguments.length; i++)
        console.log(arguments[i])
}

function goo(a, b){
    console.log(`a = ${a}  b = ${b}`)
}

/*
function(){ // Função anónima
    console.log('I am anonyous')
}
*/

function testArgs() {
    foo('ola', 'isel')
    foo()
}

function testName() {
    console.log(foo.name)
    console.log(bar.name)
}

function testThis(){
    foo() // this = undefined

    const std = {
        bar: foo
    }

    std.bar() // this = std

    // foo.call('isel', 67, 'ola', {})
    // <=>
    const arr = [ 67, 'ola', {}]
    foo.apply('isel', arr)
}

testThis()