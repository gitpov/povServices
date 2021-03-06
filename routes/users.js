var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Order = require('../models/order');
var bcrypt = require('bcryptjs');
const passport = require('passport');

/**
 * @api {post} /login Login with a user
 * @apiName Login
 * @apiGroup Login
 * @apiPermission none
 * 
 * @apiParamExample {json} Example usage:
                 {
    "email": "John.Doe@gmail.com",
    "password": "toor"
    }

 * @apiParam {String} email email of the user to login
 * @apiParam {password} password  Password of the user to login
 * 
 * @apiSuccess {string} Token Token to authenticate user's session logge
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZGMyM2VjZTg3ODVlMDAxNTc1MWQ0NCIsImlhdCI6MTU0MTE1NzAzM30.x1mrw03aL0wCp9DKMv7CPwcQvre4WilBuzzb0F79Bkc
 * 
 * @apiError Login validation failed
 */

/**
 * @api {get} /users/ Request all users's informations
 * @apiName GetUsers
 * @apiGroup User
 * @apiPermission admin
 * 
 * @apiUse successUser
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 */
router.get('/', passport.authenticate('jwt', {session: false}), function (user, req, res, next) {
    User.find().sort('name').exec(function (err, users) {
        if (err) {
            return next(err);
        }


        res.send(users);
    });
});


/**
 * @api {get} /users/:Id/nbrOrders Request the number of the user's orders
 * @apiName GetUserNbrOrders
 * @apiGroup User
 * @apiPermission admin or user
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/users/5bc766872b4eb60ccc24766a/nbrOrders
 * 
 * @apiSuccess {number} id Unique Id of the user
 * @apiSuccess {number} ordersCount  Number of orders of the user
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
        "_id": "5bdc23ece8785e0015751d44",
        "ordersCount": 1
    }
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */
router.get('/:userId/nbrOrders', passport.authenticate('jwt', {session: false}), function(user, req, res, next){
    User.findOne({_id:req.params.userId},(err,user) => {
        Order.aggregate([
            {
                $match: {
                    "userId": user._id
                }
            },
            {
                $group: {
                    _id: '$userId',
                    ordersCount: {
                        $sum: 1
                    }
                }
            }
        ], function (err, results) {
            if (err) {
                return next(err);
            }
            res.send(results)
        })
    })
});

/**
 * @api {get} /users/:Id/orders Request the user's orders
 * @apiName GetUserOrders
 * @apiGroup User
 * @apiPermission admin or user
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/users/5bc766872b4eb60ccc24766a/orders
 * 
 * @apiUse successOrder
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */
router.get('/:userId/orders', passport.authenticate('jwt', {session: false}), function(user, req, res, next){

    let query = Order.find();

    query = query.where('userId').equals(req.params.userId);
    //le premier userId correspond au id du model order, le second est l'id dans le get

    query.exec(function(err, orders) {
        if (err) {
            return next(err);
        }
        res.send(orders);
    });
});


/**
 * @api {get} /users/protected Test route Send logged user email
 * @apiName GetUserEmail
 * @apiGroup User
 * @apiPermission user and admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/users/protected
 *
 * @apiSuccess {String} e-mail E-mail of the user
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */

router.get('/protected', passport.authenticate('jwt', {session: false}), function (user, req, res, next) {
    res.send(user.email); //id --> _id dans la DB
});



/**
 * @api {get} /users/:id Request a user's informations
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission user and admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/users/5bc766872b4eb60ccc24766a
 *
 * @apiParam {Number} id Unique identifier of the user
 * 
 * @apiUse successUser
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */

router.get('/:userId', loadUserId, passport.authenticate('jwt', {session: false}), function (user, req, res, next) {
    res.send(user);
});


/**
 * @api {delete} /users/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission user and admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/users/5bc766872b4eb60ccc24766a
 *
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No-content
 *     { }
 * 
 * @apiError NoAccessRight Only authenticated Admins can access the data.     
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */

router.delete('/:userId', loadUserId, passport.authenticate('jwt', {session: false}), function (user, req, res, next) {

    if (!user._id.equals(req.params.userId))
    {
        res.status(401).send('You can only delete your own account');
    } else
    {
        req.user.remove(function (err, deleteduser)
        {
            if (err) {
                return next(err);
            }
            res.sendStatus(204);
        });
    }
});

/**
 * @api {put} /users/:id Modifiy a user
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission user and admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/users/5bc766872b4eb60ccc24766a
 *
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     { user modified }
 * 
 * @apiError NoAccessRight Only authenticated User and logged User can access and modifiy his own data. 
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */

router.put('/:userId', loadUserId, passport.authenticate('jwt', {session: false}), function (user, req, res, next) {
    const plainPassword = req.body.password;
    const saltRounds = 10;

    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            return next(err);
        }

    if (!user._id.equals(req.params.userId))
    {
        res.status(401).send('You can only modifiy your own account');
    } 
    else
    {
        req.user.firstname = req.body.firstname;
        req.user.name = req.body.name;
        req.user.email = req.body.email;
        req.user.password = hashedPassword;
        
        req.user.address.City = req.body.address.City;
        req.user.address.NPA = req.body.address.NPA;
        req.user.address.street = req.body.address.street;
        req.user.image = req.body.image;

        req.user.save(function (err, savedUser)
        {
            if (err)
            {
                res.send(err);
            }
            res.status(200).send(savedUser);
        });
    }
    });
});

/**
 * @api {pactch} /users/:id Modifiy a user
 * @apiName PatchUser
 * @apiGroup User
 * @apiPermission user and admin
 * 
 * @apiParamExample {url} Example usage:
 * http://localhost:3000/users/5bc766872b4eb60ccc24766a
 *
 * @apiParam {Number} id Unique identifier of the user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     { user modified }
 * 
 * @apiError NoAccessRight Only authenticated User and logged User can access and modifiy his own data. 
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 */
router.patch('/:userId', loadUserId, passport.authenticate('jwt', {session: false}), function (user, req, res, next) 
{
    if (req.body.firstname !== undefined) 
    {
    req.user.firstname = req.body.firstname;
    }
    if (req.body.name !== undefined) 
    {
    req.user.name = req.body.name;
    }
    if (req.body.email !== undefined) 
    {
    req.user.email = req.body.email;
    }
    if (req.body.password !== undefined) 
    {
    req.user.password = req.body.password;
    }
   if(req.body.address !== undefined)
   {
    if (req.body.address.City !== undefined) {
        req.user.address.City = req.body.address.City;
      }
      
      if (req.body.address.NPA !== undefined) {
        req.user.address.NPA = req.body.address.NPA;
      }
      if (req.body.address.street !== undefined) {
        req.user.address.street = req.body.address.street;
      }
   } 
 
  if (req.body.image !== undefined) {
    req.user.image = req.body.image;
  }


  req.user.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }

    res.status(200).send(savedUser);
  });
});


/**
 * @api {post} /users/ Add a user
 * @apiName AddUser
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiParamExample {json} Example usage:
 {
 "firstname": "John",
 "name": "Doe",
 "email": "John.Doe@gmail.com",
 "password": "toor",
 "address": {
 "street": "Avenue des Sports 20",
 "NPA": "1401",
 "City": "Yverdon-les-Bains"
 }
 }
 * @apiParam {String} firstName First name of the user
 * @apiParam {String} name  Last name of the user
 * @apiParam {String} e-mail E-mail of the user
 * @apiParam {Hash} password Hash password ot the user
 * @apiParam {object} address Address of the user
 * @apiParam {String} address.street Street of the user
 * @apiParam {Number} address.npa NPA of the user
 * @apiParam {String} address.city City of the user
 * 
 * @apiUse successUser
 * 
 * @apiError User validation failed
 */
router.post('/', function (req, res, next) {

    const plainPassword = req.body.password;
    const saltRounds = 10;

    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            return next(err);
        }
        const newUser = new User(req.body);
        newUser.password = hashedPassword;
        newUser.save(function (err, savedUser) {
            if (err) {
                return next(err);
            }
            res
                    .status(201)
                    .set('Location', `http://localhost:3000/users/${savedUser._id}`)
                    .send(savedUser);
        });
    });

});


function loadUserId(req, res, next) {
    User.findById(req.params.userId).exec(function (err, user) {
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

/**
 * @apiDefine successUser
 * @apiSuccess {String} firstName First name of the user
 * @apiSuccess {String} name  Last name of the user
 * @apiSuccess {String} e-mail E-mail of the user
 * @apiSuccess {Hash} password Hash password ot the user
 * @apiSuccess {object} address Address of the user 
 * @apiSuccess {String} address.street Street of the user
 * @apiSuccess {Number} address.npa NPA of the user
 * @apiSuccess {String} address.city City of the user
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 "_id": "5bc764b0a8ce7a3060a98af9",
 "firstname": "John",
 "name": "Doe",
 "email": "John.Doe@gmail.com",
 "password": "$2a$10$Py3VOkDWvoYcaydFjs6yEOlEmSiOXEeKURov1coXyc/7YqHMJo1uC",
 "address": {
 "street": "Avenue des Sports 20",
 "NPA": 1401,
 "City": "Yverdon-les-Bains"
 },
 "__v": 0
 }
 */
