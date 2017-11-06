const http = require('http')
const url = require('url')
const fs = require('fs')
const hbs = require('handlebars')
const connect = require('connect')
const favicon = require('serve-favicon')
const path = require('path')
const footRouter = require('./footballRoutes')
const port = 3000

/**
 * Init HTTP server
 */
const router = connect() // Init an empty pipeline of Middlewares
const server = http.createServer(router)
server.listen(port)

/**
 * Endpoints paths
 */
 router.use((req, resp, next) => {
    const urlObj = url.parse(req.url, true)
    req.query = urlObj.query
    resp.send = function(viewPath, ctx) {
        const html = view(viewPath)(ctx)
        resp.setHeader('Content-Type', 'text/html')
        resp.end(html)
    }
    next()
 })

router.use(favicon(path.join(__dirname, 'public', 'supermario.jpg')))
router.use(footRouter)

footRouter.use((err, req, resp, next) => {
    resp.statusCode = 500
    resp.setHeader('Content-Type', 'text/html')
    resp.end(err.message)    
})

footRouter.use((req, resp) => {
    resp.statusCode = 404 // Resource Not Found
    resp.end()
})

/**
 * Returns template Handlebars.
 * 
 * @param {*} viewPath Path for handlebars template source.
 */
function view(viewPath) {
    if(!view.paths) view.paths = {} // Init paths cache
    if(view.paths[viewPath]) return view.paths[viewPath]
    const viewSrc = fs.readFileSync(viewPath).toString()
    const template = hbs.compile(viewSrc)
    view.paths[viewPath] = template
    return template
}
