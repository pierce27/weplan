var express = require('express');
var http = require('http');
var m = require('./mongoQuery')
var auth = require('./auth')
var MongoStore = require('connect-mongodb');
var app = express();
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var engines = require('consolidate');

module.exports = function (app) {


// ROUTES START HERE (move to seperate file)

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

app.get('/auth/facebook/callback', 
                      passport.authenticate('facebook', {session: true, successRedirect: '/main',
  									  failureRedirect: 'login.html' }));



app.get("/main", auth.ensureAuthenticated, function(req, res){
  
  res.render('main.html')


})

app.get("/login", function(req, res){res.render('login.html')})


app.get("/findTasks",
  function(req, res, next){
    console.log('user id: ' + req.user[0]);
    next();

  }, m.findTasks);

  app.get("/findTasks",
  function(req, res, next){
    console.log('user id: ' + req.user[0]);
    next();

  }, m.findTasks);



};