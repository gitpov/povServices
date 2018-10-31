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

/**
 * @api {get} /orders/ Request all orders's informations
 * @apiName GetOrders
 * @apiGroup Order
 * @apiPermission admin
 * 
 * @apiUse successOrder
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 */
router.get('/', passport.authenticate('jwt', {session: false}), function (user, req, res, next)
{
    if (!admin)
    {
        res.status(401).send("You have to be admin to see all orders");
    } else
    {
        Order.find().sort('date').exec(function (err, orders) {

            if (err) {
                return next(err);
            }
            res.send(orders);
        });

    }
});

/**
 * @api {get} /orders/:id Request a order's informations
 * @apiName GetOrder
 * @apiGroup Order
 * @apiPermission user and admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/orders/5bc766872b4eb60ccc24766a
 *
 * @apiParam {Number} id Unique identifier of the order
 * 
 * @apiUse successOrder
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError OrderNotFound The <code>id</code> of the Order was not found.
 */
router.get('/:orderId', loadOrderId, passport.authenticate('jwt', {session: false}), function (user, req, res, next)
{
    if (!user._id.equals(req.order.userId))
    {
        res.status(401).send('You can only see your own orders');
    } else
    {
        res.send(req.order);
    }
});

/**
 * @api {get} /orders/:id Request the products of the user's order
 * @apiName GetUserOrderProducts
 * @apiGroup Order
 * @apiPermission user and admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/orders/5bc766872b4eb60ccc24766a/products
 *
 * @apiParam {Number} id Unique identifier of the order
 * 
 * @apiUse successOrder
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError OrderNotFound The <code>id</code> of the Order was not found.
 */
router.get('/:orderId/products', loadOrderId, passport.authenticate('jwt', {session: false}), function (user, req, res, next) {

    if (!user._id.equals(req.order.userId))
    {
        res.status(401).send('You can only see your own orders');
    } else
    {
        res.send(req.order.orderLines);
    }
});

/**
 * @api {post} /orders/ Add an order for a user with products
 * @apiName AddOrder
 * @apiGroup Order
 * @apiPermission admin and user
 * 
 * @apiParamExample {json} Example usage:
                 {
    
    }

 * @apiParam {String} date Date of the order
 * 
 * @apiUse successOrder
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.  
 * @apiError Order validation failed
 */
router.post('/', passport.authenticate('jwt', {session: false}), function (user, req, res, next) {

    const newOrder = new Order(req.body);
    newOrder.userId = user._id;
    newOrder.save(function (err, savedOrder) {
        if (err) {
            return next(err);
        }
        // Send the saved document in the response
        res.send(savedOrder);
    });
});

/**
 * @api {put} /orders/:Id Modify an order
 * @apiName ModifyOrder
 * @apiGroup Order
 * @apiPermission admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/orders/5bc766872b4eb60ccc24766a

 * @apiParam {Number} id Unique identifier of the order
 * 
 * @apiUse successOrder
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.  
 * @apiError OrderNotFound The <code>id</code> of the Order was not found.
 */
router.patch('/:orderId', loadOrderId, passport.authenticate('jwt', {session: false}), function (user, req, res, next) {

    if (!admin)
    {
        res.status(401).send("You have to be admin to modify the state of an order");
    }
    else
    {
        // Update properties present in the request body
        if (req.body.state !== undefined) {
            req.order.state = req.body.state;
        }

        req.order.save(function (err, savedOrder) {
            if (err) {
                return next(err);
            }
           
            res.send(savedOrder);
        });
    }
});

function loadOrderId(req, res, next) {
    Order.findById(req.params.orderId).exec(function (err, order) {
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

/**
 * @apiDefine successOrder
 * @apiSuccess {date} date Date of the order
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 "_id": "5bc764b0a8ce7a3060a98af9",
 "date": 20181010
 },
 "__v": 0
 }
 */