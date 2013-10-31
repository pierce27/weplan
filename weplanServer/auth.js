var m = require('./mongoQuery')

module.exports.ensureAuthenticated = function (req, res, next){
  if (req.isAuthenticated() == false){

    res.redirect('/login')


  } else {
  	req.session.cookie.maxAge = 5 * 60 * 1000;
  	next()

  }
}

module.exports.roleRender = function (req, res, next){
	if (req.user[0].role == ''){
    	res.redirect('/setup')
    } else if (req.user[0].role == 'bride'){
    	res.render('bride.html')
    } else if (req.user[0].role == 'groom'){
    	res.render('groom.html')
    } else if (req.user[0].role == 'bridesmaid'){
    	res.render('bridesmaid.html')
    } else if (req.user[0].role == 'groomsman'){
    	res.render('groomsman.html')
    } else if (req.user[0].role == 'bridemom'){
    	res.render('brideMom.html')
    } else if (req.user[0].role == 'bridemom'){
    	res.render('groomMom.html')
    } else if (req.user[0].role == 'friendfamily'){
    	res.render('other.html')
    }  
}


module.exports.serializeOrCreate =  function(fbuser, done){
	console.log('Serialize or Create?')
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