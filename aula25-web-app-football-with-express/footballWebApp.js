const http = require('http')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const footRouter = require('./footballRoutes')
const port = 3000

/**
 * Setup express Web App 
 */
const router = express() // Init an empty pipeline of Middlewares
// view engine setup
router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'hbs');

/**
 * Init HTTP server
 */
const server = http.createServer(router)
server.listen(port)

/**
 * Endpoints paths
 */
router.get(favicon(path.join(__dirname, 'public', 'supermario.jpg')))
router.use(footRouter)

router.use((err, req, resp, next) => {
    resp.statusCode = 500
    resp.setHeader('Content-Type', 'text/html')
    resp.end(err.message)    
})

router.use((req, resp) => {
    resp.statusCode = 404 // Resource Not Found
    resp.end()
})

