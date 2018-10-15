var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().sort('name').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

router.get('/:userId', loadUserId, function(req, res, next) {

    res.send(req.user);
});

router.delete('/:userId', loadUserId, function(req, res, next) {

    req.user.remove(function(err,deleteduser){
      if (err) {
        return next(err);
      }
      res.sendStatus(204);
    });
});

/* POST new user */
router.post('/', function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newUser = new User(req.body);
  // Save that document
  newUser.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedUser);
  });
});

function loadUserId(req, res, next) {
    User.findById(req.params.userId).exec(function(err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.status(404).send('No user found with ID ' + req.params.userId);
        }
        req.user = user;
        next();
    });
}
module.exports = router;
