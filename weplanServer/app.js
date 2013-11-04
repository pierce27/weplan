var express = require('express');
var http = require('http');
var m = require('./mongoQuery')
var auth = require('./auth')
var MongoStore = require('connect-mongodb');
var app = express();
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy;
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
    var wpUser = profile
    m.findOrCreateFB(wpUser, done)
    // done(null, profile);

  }
));


passport.use('localSignUp', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req, username, password, done){

    console.log(req.body)
    console.log('local')
    
    var wpUser = req.body;
    m.createLocal(wpUser, done)
}));



passport.use('localSignIn', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
    function(req, username, password, done){

    console.log(req.body)
    console.log('local')
    
    var wpUser = req.body;
    m.findLocal(wpUser, done)
}));





passport.serializeUser(function(user, done) {

       console.log('serialized');
       console.log(user)

       //Look for User, if none exists create and serialize, if one exists serialize it
       // findOrCreate(user, done);
       done(null, user._id);


});

passport.deserializeUser(function(id, done) {
	console.log('deserialize');

  // console.log('id: ' + id);

  m.User.find({_id: id}, function(err,user){
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


//MAIN RENDER
app.get("/main", auth.ensureAuthenticated, auth.roleRender)


//INITIAL USER
app.get("/login", function(req, res){res.render('login.html')})

app.get("/setup", auth.ensureAuthenticated,  function(req, res){res.render('setup.html')})

app.post("/setup", function(req,res, next){m.saveProfile(req, res, next)})

app.post('/signup',
  passport.authenticate('localSignUp', { successRedirect: '/main',
                                   failureRedirect: '/login'})
);

app.post('/signin',
  passport.authenticate('localSignIn', { successRedirect: '/main',
                                   failureRedirect: '/login'})
);


//GET DATA FOR MAIN
app.get("/findTasks", m.findTasks);

app.get("/findWedding", m.findWedding);

app.get("/getMe", m.getMe);


//UPDATE DATA FROM MAIN
app.post("/updateTask", m.updateTask);

app.post("/deleteTask", m.deleteTask);

app.post("/newTask", m.saveNewTask);







var port = 3000;

app.listen(port);
console.log('Listening on port ' + port);







