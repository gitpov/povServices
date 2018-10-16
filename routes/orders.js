var express = require('express');
var router = express.Router();
const Order = require('../models/order');

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

module.exports = router;