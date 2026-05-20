var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginValidationRouter=require("./routes/loginValidationRouteModule");
var newSignUpRouter=require("./routes/newSignupRouteModule")
var getProductDetailsRouter= require("./routes/getProductDetailsRouteModule");
var getProductCategoriesRouter= require("./routes/getProductCategoriesRouteModule")
var insertNewProductsDataIntoDB= require("./routes/insertNewProductsDataIntoDBRouteModule");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//You must expose the folder as static in app.js 
app.use('/newProductUploadImages', express.static(path.join(__dirname, 'newProductUploadImages')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/validateLoginCredentials",loginValidationRouter);
app.use("/newUserRegistration",newSignUpRouter);
app.use("/getProductDetails",getProductDetailsRouter);
app.use("/getProductCategories",getProductCategoriesRouter);
app.use("/insertNewProducts",insertNewProductsDataIntoDB);

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