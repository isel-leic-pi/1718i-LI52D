'use strict'
/*
const std1 = {
    name: 'Maria Papoila',
    nr: 87135,
    course: 'LEIC',
    print: function() { 
        console.log(`${this.nr} ${this.name}`) 
    }
}
const std2 = {
    name: 'Jose Maria',
    nr: 72533,
    course: 'LEIC',
    print: function() { 
        console.log(`${this.nr} ${this.name}`) 
    }
}
*/

function Student(nr, name) {
    this.nr = nr
    this.name = name
}

Student.prototype.print = function() { 
    console.log(`${this.nr} ${this.name}`) 
}

const std1 = new Student(1425, 'Maria Papoila')
const std2 = new Student(763215, 'Jose Manel')

std1.print()
std2.print()

std1.print = function () {
    console.log('Erase print')
}

std1.print()
std2.print()

std1.constructor.prototype.print = function() {
    console.log('New Print')
}

std2.print()
