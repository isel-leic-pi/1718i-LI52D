'use strict';

module.exports = initPipeline

function initPipeline() {
    
    router.use = addMw
    return router

    function router(req, resp) {
        // TPC
        throw new Error('Not implemented!!!!')
    }
    function addMw(mw) {
        // TPC
        throw new Error('Not implemented!!!!')
    }
}