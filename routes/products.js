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

router.get('/:productId', loadProductId, function(req, res, next) {

    res.send(req.product);

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

router.put('/:productId', loadProductId, function(req, res, next) {

    req.product.name = req.body.name;
    req.product.price = req.body.price;
    req.product.image = req.body.image;

    req.product.save(function(err, updatedProduct) {
        if (err) {
            return next(err);
        }

        debug(`Updated product "${updatedProduct.name}"`);
        res.send(updatedProduct);
        res.sendStatus(204);
    });
});

router.delete('/:productId', loadProductId, function(req, res, next) {

    req.product.remove(function(err,deletedproduct){
        if (err) {
            return next(err);
        }
        res.sendStatus(204);
    });
});

function loadProductId(req, res, next) {
    product_model.findById(req.params.productId).exec(function(err, product) {
        if (err) {
            return next(err);
        } else if (!product) {
            return res.status(404).send('No product found with ID ' + req.params.productId);
        }
        req.product = product;
        next();
    });
}

module.exports = router;