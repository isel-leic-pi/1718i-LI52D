'use strict'

function printProperties(obj) {
    console.log('######################################33')
    for(let prop in obj) {
        const val = obj[prop] // <=> Reflexão
        console.log(prop + ': ' + val)
        if(val instanceof Function)
            val()
    }
}

const student1 = {
    name: 'Maria Papoila',
    nr: 87135,
    course: 'LEIC',
    print: function() { console.log('I am student 1') }
}

printProperties(student1)

// Dot notation:
// student1.name // Quando conheço as minhas propriedades

delete student1.nr // Característica DINAMICA da linguagem
student1.school = 'ISEL'

printProperties(student1)

