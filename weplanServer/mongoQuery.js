var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/' + 'myprojectdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var taskSchema = mongoose.Schema({
    uid: String,
    creator: String,
    name: String,
    details: String

});

var userSchema = mongoose.Schema({
	uid: String,
	firstName: String,
	lastName: String,
	profilepic: String,
	role: String

});

var Task = mongoose.model('Task', taskSchema);

var User = mongoose.model('User', userSchema);

//Find Tasks
exports.findTasks = function (req, res) {

	return Task.find({uid: req.user[0].uid}, function (err, tasks) {
		if (!err) {
		        res.jsonp(tasks);
		        console.log('sent');
	  	} else {
	    		console.log(err);
	  	}
	});
}

exports.saveProfile = function(req, res, next) {
	console.log('USER')
	console.log(req.user)
  User.update({uid: req.user[0].uid}, { role: req.body.role }, function(err, numberAffected, raw){
    console.log('Saved Role')
    console.log(raw);
    console.log(req.user)
    res.send('updated')


  })
}



exports.saveNewTask = function (req, res, next){
  console.log(req.body)
  console.log(req.user)

  var newTask = new Task({ uid: req.user[0].uid, creator: req.user[0].firstName, name: req.body.name, details: req.body.details  })
  console.log(newTask.name);

  return newTask.save(function (err, newTask) {
    res.jsonp(newTask);
  });
}


exports.deleteTask = function (req, res, next){
  console.log('delete')
  console.log(req.body)

  // var newTask = new Task({ uid: req.user[0].uid, creator: req.user[0].firstName, name: req.body.name, details: req.body.details  })
  // console.log(newTask.name);

  // return newTask.save(function (err, newTask) {
  //   res.jsonp(newTask);
  // });

	return Task.find({_id: req.body._id}).remove(function(query){
		res.jsonp(query)		
	});
	
}

exports.findOrCreateFB= function(wpUser, done){   

  User.find({uid: wpUser.id}, function(err, user){

      if(user.length == 0){
        console.log('User Length is 0')
        var newUser = new User ({uid: wpUser.id, firstName: wpUuser.name.givenName, lastName: wpuUser.name.familyName, role: ''});

        newUser.save(function (err, newUser) {
          console.log('saved' + newUser.id);
          done(null, fbuser);
        });
        
        

      } else {

        done(null, wpUser);
        console.log('serialized');
      }

    })
}

exports.findLocal= function(wpUser, done){   

  User.find({uid: wpUser.email}, function(err, user){

      if(user.length == 0){

      	return done(null, false, { message: 'User Does Not Exist.' });


        
        

      } else {

        done(null, user);
        console.log('Logging In');
      }

    })
}

exports.createLocal= function(wpUser, done){  


  User.find({uid: wpUser.uid}, function(err, user){

      if(user.length == 0){
        console.log('User Length is 0')
        var newUser = new User ({uid: wpUser.email, password: wpUser.password, firstName: wpUser.name.firstName, lastName: wpUser.name.lastName, role: ''});

        newUser.save(function (err, newUser) {
          console.log(err);
          done(null, newUser);
        });
        
        

      } else {

        return done(null, false, { message: 'User Exists.' });

        
      }

    })
}



exports.User = User;
exports.Task = Task;









