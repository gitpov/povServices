var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/product');
const passport = require('passport');
const ObjectId = mongoose.Types.ObjectId;

var admin = true;


/* GET order listing. */


router.get('/', passport.authenticate('jwt', {session: false}), function(user, req, res, next) 
{
if(!admin)
 {
     res.status(401).send("You have to be admin to see all orders");
 }
 else
 {
    Order.find().sort('date').exec(function(err, orders) {

        if (err) {
            return next(err);
        }
        res.send(orders);
    });

    }});


router.get('/:orderId', loadOrderId, passport.authenticate('jwt', {session: false}), function(user, req, res, next) 
{
    console.log(req.order.userId);
    res.send(req.order);
});

router.get('/:orderId/products', function(req, res, next){

    Order.findById(req.params.orderId).exec(function(err, order) {
        if (err) {
            return next(err);
        } else if (!order) {
            return res.status(404).send('No order found with ID ' + req.params.orderId);
        }
        res.send(order.orderLines);
    });
});

router.post('/', function(req, res, next) {

    const newOrder = new Order(req.body);
    newOrder.userId = "5bc4a018d90b804bd49e28bd";
    newOrder.save(function(err, savedOrder) {
        if (err) {
            return next(err);
        }
        // Send the saved document in the response
        res.send(savedOrder);
    });
});    

router.delete('/:orderId', loadOrderId ,function(req, res, next) {
    req.order.remove(function(err,deletedorder){
        if (err) {
          return next(err);
        }
        res.sendStatus(204);
      });
});

router.patch('/:orderId', loadOrderId ,function(req, res, next) {

    // Update properties present in the request body
    if (req.body.state !== undefined) {
        req.order.state = req.body.state;
    }

    req.order.save(function(err,savedOrder){
        if (err) {
            return next(err);
        }
        debug(`Updated order "${savedOrder.state}"`);
        res.send(savedOrder);
    });
});

function loadOrderId(req, res, next) {
    Order.findById(req.params.orderId).populate('userId').exec(function(err, order) {
        if (err) {
            return next(err);
        } else if (!order) {
            return res.status(404).send('No order found with ID ' + req.params.orderId);
        }
        req.order = order;
        next();
    });
}

/*
function loadProductId(req, res, next) {

    const productId = req.params.id;
    if (!ObjectId.isValid(productId)) {
        return productNotFound(res, productId);
    }

    Person.findById(req.params.id, function(err, product) {
        if (err) {
            return next(err);
        } else if (!product) {
            return productNotFound(res, productId);
        }

        req.product = product;
        next();
    });
}
*/

/*
function productNotFound(res, productId) {
    return res.status(404).type('text').send(`No product found with ID ${productId}`);
}
*/

/*
function getOrdersOrderedBy(orders, callback){

    if (orders.length <= 0) {
        return callback(undefined, []);
    }

    Order.find().aggregate([
        {
            $match: {
                userId: {
                    $in: orders.map(user => user._id)
                }
            }
        },
    ], callback);
}
*/


module.exports = router;