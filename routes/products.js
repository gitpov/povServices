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

router.get('/:productId', function(req, res, next) {

    const id = req.params.productId;
    product_model.findById(id).exec(function(err, product) {
        if (err) { return next(err); }
        else if (!product) { return res.sendStatus(404); }

        res.send(product);

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

router.delete('/:productId', function(req, res, next) {
    res.status(200).json({
        message: 'deleted product'
    });
});
module.exports = router;