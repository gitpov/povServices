var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const ObjectId = mongoose.Types.ObjectId;
/* GET order listing. */
router.get('/', function(req, res, next) {
  Order.find().sort('date').exec(function(err, orders) {
    if (err) {
      return next(err);
    }
    res.send(orders);
  });
});

router.get('/:orderId', loadOrderId, function(req, res, next) {
    res.send(req.order);
});

router.post('/', function(req, res, next) {

    const newOrder = new Order(req.body);
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
    Order.findById(req.params.orderId).exec(function(err, order) {
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

module.exports = router;