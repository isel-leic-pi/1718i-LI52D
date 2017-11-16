const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const hbs = require('hbs')
const bodyParser = require('body-parser')

const favRouter = require('./routes/favouritesRoutes');
const footRouter = require('./routes/footballRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

// uncomment after placing your favicon in /public
app.use(bodyParser.urlencoded({ extended: false }))
app.use(favicon(path.join(__dirname, 'public', 'supermario.jpg')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favRouter)
app.use(footRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
