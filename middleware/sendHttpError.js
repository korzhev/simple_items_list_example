var env = require('../config').env;

module.exports = function (req, res, next) {

    res.sendHttpError = function (error) {
        res.status(error.status);
        if (env === 'production') {
            res.render("error", {       //render error without stack
                message: error.message,
                error: {}
            });
        } else {
            // uncomment if need to send errors if AJAX request was
            //if (req.xhr) {
                //res.json({
                //    message: error.message,
                //    error: error
                //});
            //} else {
            res.render("error", {       // render error with stack
                message: error.message,
                error: error
            });
            //}
        }

    };

    next();

};