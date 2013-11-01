var express = require('express');
var http = require('http');
var m = require('./mongoQuery')
var auth = require('./auth')
var MongoStore = require('connect-mongodb');
var app = express();
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var engines = require('consolidate');

app.configure(function() {
  app.use(express.cookieParser('andrewsecret'));
  app.use(express.bodyParser());
  app.use(express.session({ cookie: {maxAge: 10000}, store: new MongoStore({url: 'mongodb://localhost/myprojectdb'})  }));
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

    console.log(profile)
    findOrCreate(profile, done)
    // done(null, profile);

  }
));





passport.serializeUser(function(user, done) {

       console.log('serialized');

       //Look for User, if none exists create and serialize, if one exists serialize it
       // findOrCreate(user, done);
       done(null, user.id);


});

passport.deserializeUser(function(uid, done) {
	console.log('deserialize');

  // console.log('id: ' + id);

  m.User.find({uid: uid}, function(err,user){
    // console.log("FOUND USER: " + user)
    done(null, user);

    });
  

});



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
  									  failureRedirect: '/login' }));



app.get("/main", auth.ensureAuthenticated, auth.roleRender)

app.get("/login", function(req, res){res.render('login.html')})

app.get("/setup", auth.ensureAuthenticated,  function(req, res){res.render('setup.html')})


app.get("/findTasks",
  function(req, res, next){
    console.log('user id: ' + req.user[0]);
    next();

  }, m.findTasks);

app.post("/profile", function(req,res, next){

  m.saveProfile(req, res, next)
  

})

app.post("/deleteTask", function(req,res, next){

  m.deleteTask(req, res, next)
  

})

app.post("/newTask", function(req,res, next){

  m.saveNewTask(req, res, next)
  

})










var findOrCreate= function(fbuser, done){   

  m.User.find({uid: fbuser.id}, function(err, user){

      if(user.length == 0){
        console.log('User Length is 0')
        var newUser = new m.User ({uid: fbuser.id, firstName: fbuser.name.givenName, lastName: fbuser.name.familyName, role: ''});

        newUser.save(function (err, newUser) {
          console.log('saved' + newUser.id);
          done(null, fbuser);
        });
        
        

      } else {

        done(null, fbuser);
        console.log('serialized');
      }

    })
}








var port = 3000;

app.listen(port);
console.log('Listening on port ' + port);







