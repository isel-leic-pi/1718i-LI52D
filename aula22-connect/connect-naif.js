'use strict';

module.exports = initPipeline

const arr = [] // stores the Middlewares

function initPipeline() {
    router.use = addMw
    return router

    /**
     * Handler for HTTP requests.
     */
    function router(req, res) {
        let idx = 0
        next()
        function next() {
            const mw = arr[idx++] // Get the next middleware
            mw(req, res, next)    // Call the middleware 
        }
    }
    
    /**
     * Adds a mw to the arr array.
     */
    function addMw(mw) {
        arr.push(mw)
    }
}