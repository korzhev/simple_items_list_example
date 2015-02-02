// depending on evn there will be different settings
var env = process.env.NODE_ENV || 'local';

if (env === 'production') {
    var config = {
        db: {
            uri: "mongodb://swtest:swtest@ds056727.mongolab.com:56727/swiftgift2",
            options: {
                server: {
                    socketOptions: {
                        keepAlive: 1
                    }
                }
            }
        },
        server: {
            port: 8000
        },
        debug_lvl: "error"
    };
} else {
    var config = {
        db: {
            uri: "mongodb://swtest:swtest@ds056727.mongolab.com:56727/swiftgift2",
            options: {
                server: {
                    socketOptions: {
                        keepAlive: 1
                    }
                }
            }
        },
        server: {
            "port": 8000
        },
        debug_lvl: "debug"
    };
}

config.env = env; // current env
config.perPage = 12; // items per page
config.paginationRange = 5; // doesn't use

module.exports = config;