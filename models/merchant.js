var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

exports.Merchant = mongoose.model('Merchant', schema);