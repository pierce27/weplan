var express = require('express');
var http = require('http');
var m = require('./mongoQuery')
var MongoStore = require('connect-mongodb');
var app = express();
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var engines = require('consolidate');

app.configure(function() {
  app.use(express.cookieParser('andrewsecret'));
  app.use(express.bodyParser());
  app.use(express.session({ store: new MongoStore({url: 'mongodb://localhost/myprojectdb'}) }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

  app.set('views', __dirname + '/views');
  app.engine('html', engines.ejs);
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/resources'));
});


passport.use(new FacebookStrategy({
    clientID: '1412510248979901',
    clientSecret: 'f3de5dd4e439edcd45aa5ae3575f7154',
    callbackURL: "/auth/facebook/callback"
  },  function(accessToken, refreshToken, profile, done) {

    done(null, profile);
  }
));

passport.serializeUser(function(fbuser, done) {

  
    m.User.find({uid: fbuser.id}, function(err, user){
      console.log('length' + user.length);

      if(user.length == 0){

        var newUser = new m.User ({uid: fbuser.id, firstName: fbuser.name.givenName, lastName: fbuser.name.familyName, profilepic: ''});

        newUser.save(function (err, newUser) {
          console.log('saved' + newUser.id);
        });
        done(null, fbuser.id);
        console.log('serialized');

      } else {

        done(null, fbuser.id);
        console.log('serialized');
      }
      console.log(user);
    })

});

passport.deserializeUser(function(id, done) {
	console.log('deserialize');

  console.log('id: ' + id);

    m.User.find({uid: id}, function(err,user){
      done(null, user);

    });
});


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', function(req,res,next){
    console.log('ANDREW USER:' + req.user);
    next();
  },
  passport.authenticate('facebook', {session: true, successRedirect: '/test',
  									  failureRedirect: 'http://localhost:8080/projectapp/index.html' }
  ));

app.get("/findTasks",
  function(req, res, next){
    console.log('user id: ' + req.user[0].uid);
    next();

  }, m.findTasks);

app.get("/main", function(req,res){

  res.render('main.html')

})


var port = 3000;

app.listen(port);
console.log('Listening on port ' + port);







