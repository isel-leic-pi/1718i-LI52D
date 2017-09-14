'use strict'

// x = 9 // use strict NÃO permite declaração SEM let, const ou var

const str = 'ola'

function foo(a) {
    if(a == 7) {
        var x = 'ola' // x é acessível em todo o scope de foo NÃO usar
        let y = x     // y é acessível no bloco do if
    }
    console.log(x)
    // console.log(y) // DÁ erro. RECOMENDAVEL
}

foo(7)
