var winston = require('winston');
var level = require('../config').debug_lvl;

module.exports = function (module) {

    var path = module.filename;

    var transports = [
        new winston.transports.Console({
            timestamp: true,
            colorize: true,
            level: level,
            label: path
        }),

        // save logs into file
        new winston.transports.File({
            filename: 'logs/error.log',
            colorize: false,
            level: level,
            maxsize: 4 * 1024 * 1024,
            json: false,
            label: path
        })
    ];

    return new winston.Logger({ transports: transports });
};