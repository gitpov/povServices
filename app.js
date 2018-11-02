require('dotenv/config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var orderRouter = require('./routes/orders');
const User = require('./models/user');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

const strategy = new JwtStrategy(opts, (payload, next) => {
       User.findById(payload.id).exec(function(err, user) {
        if (err || !user) {
            return next(err);
        } 
        next(user);
    });
});


passport.use(strategy);

var app = express();

//////// TEST EXO PROF MY-APP ////////////////

//connection à BD
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(function myMiddleware(req, res, next) {
  console.log('Hello World!');
  next();
});
/////////////////////////FIN TEST/////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', orderRouter);
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
app.post('/login', function(req, res, next){
    if(!req.body.email || !req.body.password)
    {
        return res.status(401).send('Missing email or password');
    }
    else
    {
        User.findOne({email:req.body.email}).exec(function(err, user) 
      {
        if (err || !user) 
        {
            res.status(401).send(err);
        } 
        if(bcrypt.compareSync(req.body.password, user.password)){
            const payload = {id:user.id};
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            res.send(token);
        } else {
            res.status(401).send('Bad credentials');
        }
    });
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
