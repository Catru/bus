var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');
var busStop = require('./routes/bus-stop');
var busRoutes = require('./routes/bus-routes');
var login = require('./routes/back_page/login');
var admin = require('./routes/back_page/index');
var logout = require('./routes/back_page/logout');
var routeManage = require('./routes/back_page/routeManage');
var stopManage = require('./routes/back_page/stopManage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  maxAge: 60000,
  resave: true,
  saveUninitialized: true,
  secret: 'test'
}));

app.use('/', routes);
app.use('/busstop',busStop);
app.use('/busroutes',busRoutes);
// 后台页面
app.use('/login',login);
app.use('/admin', admin);
app.use('/logout', logout);
app.use('/routemanage', routeManage);
app.use('/stopmanage', stopManage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
