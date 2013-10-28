var express = require('express');
var http = require('http');
var m = require('./mongoQuery')
var app = express();
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'andrewsecret' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});


passport.use(new FacebookStrategy({
    clientID: '1412510248979901',
    clientSecret: 'f3de5dd4e439edcd45aa5ae3575f7154',
    callbackURL: "/auth/facebook/callback"
  },  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(profile.name, function(err, user) {
    //   if (err) { return done(err); }
    //   console.log(profile);
    //   done(null, user);
    // });
    console.log(profile);
    done(null, profile);
  }
));

passport.serializeUser(function(fbuser, done) {
  console.log('User id:' + fbuser.id);
  done(null, fbuser.id);
  m.User.find({uid: fbuser.id}, function(err, user){
		// if(user == []){
		// 	console.log('This is the user' + user);
		// 	// console.log(fbuser);
		// 	var newUser = new m.User ({uid: fbuser.id, firstName: fbuser.name.givenName, lastName: fbuser.name.familyName, profilepic: ''});

		// 	newUser.save(function (err, newUser) {
		// 		console.log('saved' + newUser.id);
		// 	});

		// 	// return newUser;
		// } else {
		// 	// return user;
			
		// 	console.log(fbuser.id);
		// 	console.log(user);
		// }
		console.log(user);
	})
});

passport.deserializeUser(function(user, done) {
	console.log('deserialize');
  	// m.findOrCreateUser(user);
  	done(null, user);
});


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {session: true, successRedirect: 'http://localhost:8080/projectapp/main.html',
  									  failureRedirect: 'http://localhost:8080/projectapp/index.html' }));

app.get("/findTasks", m.findTasks);


var port = 3000;

app.listen(port);
console.log('Listening on port ' + port);







