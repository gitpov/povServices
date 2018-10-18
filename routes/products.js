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

/**
 * @api {post} /products/ Add a product
 * @apiName AddProduct
 * @apiGroup Product
 * @apiPermission admin
 * 
 * @apiParamExample {json} Example usage:
                 {
    "name": "Banana",
    "price": 1.9,
    "image": "images/banana.jpeg"
    }

 * @apiParam {String} name Name of the product
 * @apiParam {Number} price  Price of the product
 * @apiParam {String} image URL of the image of the product
 * 
 * @apiUse successProduct
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.  
 * @apiError Product validation failed
 */
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

/**
 * @api {delete} /Product/:id Delete a Product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/products/5bc766872b4eb60ccc24766a
 *
 * @apiParam {Number} id Unique identifier of the product
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No-content
 *     { }
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.     
 * @apiError ProductNotFound The <code>id</code> of the product was not found.
 */
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

/**
 * @apiDefine successProduct
 * @apiSuccess {String} name Name of the product
 * @apiSuccess {Number} price  Price of the product
 * @apiSuccess {String} image URL of the image of the product
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
    "_id": "5bc87ca7902104022c82bd5e",
    "name": "Banana",
    "price": 1,90,
    "image": "images/banana.jpeg",
    "__v": 0
    }
 */