'use strict';

const url = require('url')

module.exports = initPipeline

function initPipeline() {
    const arr = [] // stores the Middlewares
    router.use = addMw
    return router
    /**
     * Handler for HTTP requests.
     */
    function router(req, res) {
        const path = url.parse(req.url, true).pathname
        let idx = 0
        next()
        function next() {
            const mw = arr[idx++] // Get the next middleware
            if(!mw.pathname || mw.pathname == path)
                mw(req, res, next)    // Call the middleware 
            else
                if(idx < arr.length) next()
        }
    }
    /**
     * Adds a mw to the arr array.
     * @param {*} pathname String with path name.
     * @param {*} mw Function (req, res, next) => void.
     */
    function addMw() {
        if(arguments.length == 1)
            arr.push(arguments[0])
        else if(arguments.length == 2){
            arguments[1].pathname = arguments[0]
            arr.push(arguments[1])
        }
        else {
            throw new Error('Illegal arguments')
        }
    }
}