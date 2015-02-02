var config = require('../config');
var ProductModel = require('../models/product').Product;
var CategoryModel = require('../models/category').Category; // will be needed for filters
var MerchantModel = require('../models/merchant').Merchant;
var async = require('async');
var HttpError = require('../error').HttpError;


function pagination(page, maxPage) { // so Code Challenge asks(less 3rd side libs): pagination is handmade
    var pageList = [];
    for (var i=1; i <= maxPage; i++) {
        if ((i >= page-2) && ( i <= page+2)) { // 2 pages before and after current page
            pageList.push(i);
            if (pageList.length == 5) break; // 5 - number of showing pages
        }
    }
    if (pageList[0] === 1) { // try to fill up to 5 page list
        while ((pageList.length < 5 ) && (pageList.length < maxPage)) {
            pageList.push(pageList[pageList.length - 1] + 1);
        }
    }

    if (pageList[pageList.length - 1] === maxPage) { // try to fill up to 5 page list
        while ((pageList.length < 5 ) && (pageList.length < maxPage)) {
            pageList.unshift(pageList[0] - 1);
        }
    }
    return pageList; // there will be shown 5 or maxPage page links
}

function getPagination (page, data, callback) {
    ProductModel.count({}, // code for pagination
        function (err, count) {
            if (err) return callback(err);
            data.count = count;
            var maxPage=Math.ceil(count / config.perPage);
            page = page > maxPage ? maxPage : page; // if page parameter is more then max number of pages,
            data.maxPage = maxPage;                 // last page will be shown
            data.page = page;
            data.nextPageNumber = page + 1;
            data.prevPageNumber = page - 1;
            data.prevPage = page != 1;
            data.nextPage = page != maxPage;
            data.pageList = pagination(page, maxPage);
            callback(null);
        });
}

function getProducts (page, data, callback) {
    ProductModel.find({})
        .sort('-_id') // last products will be first
        .limit(config.perPage)
        .skip((page - 1) * config.perPage)  // as queries are parallel, if page > maxPage we will get 0 products
        .populate('categories') // fake FK by mongoose
        .populate('_merchant')  // get data about categories and merchants
        .exec(function (err, products) {
            if (err) return callback(err);
            data.products = products;
            callback(null);
        });
}

// main page, show products
exports.get = function (req, res, next) {
    var page = parseInt(req.query.page) || 1; // if page is string, it will be = 1, so first page will be shown
    page = page > 0 ? page : 1; // if page is not positive, there will be "mongoose skip error"
    var data = {};

    async.parallel([ // can be changed to series or waterfall if need to show last page, when page > maxPage
        async.apply(getPagination, page, data),
        async.apply(getProducts, page, data)
    ], function(err, result){
        if (err) return next(err);
        res.render('index', data);
    });
};