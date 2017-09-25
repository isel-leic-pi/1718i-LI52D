'use strict'
/*
 * package name as argument
 * Lookup? 
 * - Globalmente: AppData\Roaming\npm\node_modules
 * - Localmente: node_modules
 * 
 * Esta biblioteca é Anti Natural... porque viola a filosofia Async do Node.js.
 */
const req = require('sync-request') 

const resp = req('GET', 'http://example.com').getBody().toString()
console.log(resp)

