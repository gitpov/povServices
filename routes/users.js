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

router.get('/:userId', function(req, res, next) {

    const id = req.params.userId;
    User.findById(id).exec(function(err, user) {
        if (err) { return next(err); }
        else if (!user) { return res.sendStatus(404); }

        res.send(user);

    });
});

router.delete('/:id', function(req, res, next) {
  User.findById(req.params.id).exec(function(err, user) {
    if (err) { return next(err); }
    else if (!user) { return res.sendStatus(404); }
    user.remove(function(err,deleteduser){
      if (err) {
        return next(err);
      }

      res.sendStatus(204);
    });
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


module.exports = router;
