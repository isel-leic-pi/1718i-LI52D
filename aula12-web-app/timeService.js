'use strict'

/**
 * Domain service. Has nothing related with HTTP context.
 */
module.exports = {
    parsetime,
    unixtime,
    datetime,
    hello
}

function parsetime(iso) {
    return new ParseTime(new Date(iso))
}

function unixtime(iso) {
    return new UnixTime(new Date(iso))
}

function datetime(iso) {
    return new DateTime(new Date(iso))
}

function hello(){
    return "Hello World!!!"
}

/**
 * Domain entity
 */
function ParseTime(date) {
    this.hour = date.getHours()
    this.minute = date.getMinutes()
    this.second = date.getSeconds()
}

/**
 * Domain entity
 */
function DateTime(date) {
    this.hour = date.getHours()
    this.minute = date.getMinutes()
    this.second = date.getSeconds()
    this.day = date.getDay()
    this.month = date.getMonth() + 1
    this.year = date.getYear()
}

/**
 * Domain entity
 */
function UnixTime(date) {
    this.unixtime = date.getTime()
}
