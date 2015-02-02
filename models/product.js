var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: 'http://lorempixel.com/250/250/cats/' // just random image, don't want to store them
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    categories: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Category' // create fake FK
        }],
        required: true
    },
    '_merchant': {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true
    }
});

schema.index({ name: 'text' }); // this is index for future "search feature"

exports.Product = mongoose.model('Product', schema);