const express = require('express');
const router = express.Router();

const product_model = require('../models/product');

router.get('/', function(req, res, next) {
    product_model.find().exec(function(err, products) {
        if (err) {
            return next(err);
        }
        res.send(products);
    });
});

router.post('/', function(req, res, next) {

    const newProduct = new product_model(req.body);

    newProduct.save(function(err, savedProduct) {
        if (err) {
            return next(err);
        }
        // Send the saved document in the response
        res.send(savedProduct);
    });
});

module.exports = router;