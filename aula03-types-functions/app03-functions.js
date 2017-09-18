'use strict'

function xpto(){
    console.log('I am xpto')
}
function foo(){
    console.log('I am foo')
}

const bar = foo

bar.nr = '23654'
bar.course = 'leic'
bar.dummy = xpto
bar()
foo()
bar.dummy()
printProperties(bar)
printProperties(foo)

function printProperties(obj) {
    console.log('######################################33')
    for(let prop in obj) {
        const val = obj[prop] // <=> Reflexão
        console.log(prop + ': ' + val)
        if(val instanceof Function)
            val()
    }
}
