var express = require('express');
var path = require('path');

// not needed now, auto generated
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var HttpError = require('./error').HttpError;
var config = require('./config');
var log = require('./libs/logger')(module);
var errorhandler = require('errorhandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // default template engine, doesn't matter for me

// this part is used only on local machine, in another way nginx should be used
if (config.env == 'local') {
    app.use(require('morgan')('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
}

// uncomment after placing your favicon in /public
//var favicon = require('serve-favicon');
//app.use(favicon(__dirname + '/public/favicon.ico'));

// not needed now, auto generated
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// my custom middleware to handle usual errors
app.use(require('./middleware/sendHttpError'));

// connect urls
require('./routes')(app);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(404); // nice shortcut
});

// handle errors
app.use(function (err, req, res, next) {
    if (typeof err == 'number') { // if we use "next(404)" for example
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {     // for 403/401 etc errors
        res.sendHttpError(err);
    } else {                            // unexpected 500
        if (config.env == 'local') {   // on local env we need to see full stack, etc
            errorhandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

module.exports = app;