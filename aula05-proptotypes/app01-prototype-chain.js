"use strict";

/*----------------------------------------------------
 * PERSON
 * --------------------------------------------------*/

function Person (id, name) {
    if(arguments.length == 0) return this
    this.id = id
    this.name = name
    // !!!!!! NÃO Fazer
    // => Aumentar o esoaço em MEM de todos os objectos
    /*
    this.toString = function () {
        return `{id: ${this.id}, name: ${this.name}}`
    }
    */
}
Person.prototype.toString = function () {
    return `{id: ${this.id}, name: ${this.name}}`
}

/*----------------------------------------------------
 * STUDENT
 * --------------------------------------------------*/

function Student(id, name, school, course) {
    Person.call(this, id, name)
    this.school = school
    this.course = course
}

// Student.prototype.constructor = Person // !!!!! Não podemos afectar constructor
// Student.prototype = Person.prototype // !!!! Perigo partilha o MESMO protótipo
Student.prototype = new Person()

/*----------------------------------------------------
 * --------------------------------------------------*/

function isInstanceOf(obj, ctor) {
    const res = obj instanceof ctor
        ? "IS"
        : "IS NOT"
    console.log(`${obj} ${res} instance of ${ctor.name}`)
}

const p = new Person(652, 'Ze')
const s = new Student(398, 'Miguel', 'isel', 'leic')

console.log(p)
console.log(s)

isInstanceOf(p, Person)
isInstanceOf(s, Person)
