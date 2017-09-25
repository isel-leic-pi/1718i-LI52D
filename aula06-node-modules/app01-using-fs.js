const fs = require('fs')
const req = require('sync-request')
const m1 = require('./module1')
const m2 = require('./module2')
const m3 = require('./module3')

/*
 * !!!! Evitar pedidos SÍNCRONOS !!!!
 */
const data = fs.readFileSync('dummy.txt')
console.log(data.toString())

const content = req('GET', 'http://example.com')
console.log(content.getBody('utf8'))

m1.foo()
m1.bar()

m2.foo()
m2.bar()

m3()
m3.zas()