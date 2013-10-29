var m = require('./mongoQuery')

module.exports.ensureAuthenticated = function (req, res, next){
  if (req.isAuthenticated() == false){

    res.redirect('/login')

  } else {
    next()
  }
}


module.exports.serializeOrCreate =  function(fbuser, done){
	console('Serialize or Create?')
  m.User.find({uid: fbuser.id}, function(err, user){

      if(user.length == 0){
      	console.log('User Length is 0')
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

    })
}