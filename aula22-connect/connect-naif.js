'use strict';

module.exports = initPipeline

const arr = [] // stores the Middlewares

function initPipeline() {

    let idx = 0
    router.use = addMw
    return router


    /**
     * Handler for HTTP requests.
     */
    function router(req, res) {
        var mw = arr[idx]
        mw(req, res, () => next(req, res, idx) )
    }
    
    /**
     * Adds a mw to the arr array.
     */
    function addMw(mw) {
        return arr.push(mw)
    }

    function next(req, res, idx) {
        var mw = arr[++idx]
        return mw( req, res, () => next(req,res, idx))
    }
}