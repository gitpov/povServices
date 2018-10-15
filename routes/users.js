var express = require('express');
var router = express.Router();
const User = require('../models/user');
var bcrypt = require('bcryptjs');

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
    
    const plainPassword = req.body.password;
    const saltRounds = 10;
  
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
    if (err) {
      return next(err);
    }
    const newUser = new User(req.body);
    newUser.password = hashedPassword;
    newUser.save(function(err, savedUser) {
      if (err) {
        return next(err);
      }
      res.send(savedUser);
    });
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
