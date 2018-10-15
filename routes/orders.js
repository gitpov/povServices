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
    
    
router.delete('/:orderId', function(req, res, next) {
    res.status(200).json({
        message: 'deleted order'
    });
});          

module.exports = router;