var mongoose = require('mongoose'),
    config = require('../config'),
    log = require('../libs/logger')(module);

mongoose.connect(config.db.uri, config.db.options);
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});

module.exports = mongoose;