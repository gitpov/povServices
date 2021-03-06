const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const passport = require('passport');
var admin = true;

/**
 * @api {get} /products/ Request all products's informations
 * @apiName GetProducts
 * @apiGroup Product
 * @apiPermission none
 * 
 * @apiParam {string} name Name to filter the product list
 * @apiParam {number} price Price to filter the product list
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/products/
 * https://localhost:3000/products/?name=Banana
 * https://localhost:3000/products/?price=1.9
 * 
 * @apiUse successProduct
 * 
 */
router.get('/', function(req, res, next) 
{
    var query = Product.find();

    if(req.query.name)
    {
        
        query=query.where('name').equals(req.query.name);
        query.exec(function(err, products){
            if(err)
            {
                return next(err);
            }
            res.send({
                data: products
            });
        });
        
    }
    else if(req.query.price)
    {
        query=query.where('price').equals(req.query.price);
        query.exec(function(err, products){
            if(err)
            {
                return next(err);
            }
            res.send({
                page: page,
                pageSize: pageSize,
                total: total,
                totalPages: totalPages,
                data: products
            });
        });
        
    }
    else
    {
        
    

    Product.find().count(function(err, total) {
        if (err) {
            return next(err);
        }

        let query = Product.find();

        let page = parseInt(req.query.page, 10);

        if (isNaN(page) || page < 1) {
            page = 1;
        }

        let pageSize = parseInt(req.query.pageSize, 10);


        console.log(pageSize);

        if (isNaN(pageSize)) {
            pageSize = 10;
            let totPage = total/pageSize;
            if (req.query.page > totPage)
            {
                page = 1;
            }
        } else if (pageSize > 100) {
            pageSize = 100;
        } else if (pageSize < 1) {
            pageSize = 1;
        }


        query = query.skip((page - 1) * pageSize).limit(pageSize);



        query.exec(function(err, products) {
            if (err) {
                return next(err);
            } else {
                var totalPages = Math.ceil(total / pageSize)
            }

            res.send({
                page: page,
                pageSize: pageSize,
                total: total,
                totalPages: totalPages,
                data: products
            });
        });
    });
    }});


/**
 * @api {get} /products/:id Request a product's informations
 * @apiName GetProduct
 * @apiGroup Product
 * @apiPermission none
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/products/5bc766872b4eb60ccc24766a
 *
 * @apiParam {Number} id Unique identifier of the products
 * 
 * @apiUse successProduct
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError ProductNotFound The <code>id</code> of the Product was not found.
 */    
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
router.post('/', passport.authenticate('jwt', {session: false}), function(user, req, res, next) 
{
 
 if(!admin)
 {
     res.status(401).send("You have to be admin to create new products");
 }
 else
 {
    const newProduct = new Product(req.body);

    newProduct.save(function(err, savedProduct) {
        if (err) {
            return next(err);
        }
        // Send the saved document in the response
        res.send(savedProduct);
    });
    }});


/**
 * @api {put} /products/ Modify a product
 * @apiName ModifyProduct
 * @apiGroup Product
 * @apiPermission admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/products/5bc766872b4eb60ccc24766a

 * @apiParam {Number} id Unique identifier of the products
 * 
 * @apiUse successProduct
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.  
 * @apiError ProductNotFound The <code>id</code> of the Product was not found.
 */
router.put('/:productId', loadProductId, passport.authenticate('jwt', {session: false}), function(user, req, res, next) 
{

if(!admin)
 {
     res.status(401).send("You have to be admin to modify new products");
 }
 else
 {
    req.product.name = req.body.name;
    req.product.price = req.body.price;
    req.product.image = req.body.image;

    req.product.save(function(err, updatedProduct) {
        if (err) {
            return next(err);
        }

        res.status(200).send(updatedProduct);

    });
    }}
);

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
router.delete('/:productId', loadProductId, passport.authenticate('jwt', {session: false}), function(user, req, res, next) {
 if(!admin)
 {
     res.status(401).send("You have to be admin to delete new products");
 }
 else
 {
    req.product.remove(function(err,deletedproduct){
        if (err) {
            return next(err);
        }
        res.sendStatus(204);
    });
    }}
);

function loadProductId(req, res, next) {
    Product.findById(req.params.productId).exec(function(err, product) {
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