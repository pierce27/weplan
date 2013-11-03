var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/' + 'myprojectdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var weddingSchema = mongoose.Schema({
	wid: Number,
	name: String,
	bride_uid: String,
	groom_uid: String,
	date: Date,
	location: String

})
console.log('WEDDING SCHEMA')
console.log(weddingSchema)

var taskSchema = mongoose.Schema({
    wid: Number,
    creator: String,
    creatorFirstName: String,
    created: Date,
    name: String,
    description: String,
    details: String,
    users: [String]

});

var userSchema = mongoose.Schema({
	uid: String,
	firstName: String,
	lastName: String,
	password: String,
	profilepic: String,
	role: String,
	wid: Number

});

var Task = mongoose.model('Task', taskSchema);

var User = mongoose.model('User', userSchema);

var Wedding = mongoose.model('Wedding', weddingSchema);

//Find Tasks
exports.findTasks = function (req, res) {

	return Task.find({users: req.user[0].uid}, function (err, tasks) {
		if (!err) {
		        res.jsonp(tasks);
		        console.log('sent');
	  	} else {
	    		console.log(err);
	  	}
	});
}

exports.findWedding = function (req, res) {

	return Wedding.find({wid: req.user[0].wid}, function (err, wedding) {
		if (!err) {
		        res.jsonp(wedding);
		        console.log('sent');
	  	} else {
	    		console.log(err);
	  	}
	});
}

exports.saveProfile = function(req, res, next) {
	console.log('USER')
	var newWid
	Wedding.find(function(err, weddings){
		newWid = weddings.length + 1

		if(req.body.role == 'bride'){
			var brideUid = req.user[0].uid
			var groomUid = ''
		} else if(req.body.role == 'groom'){
			var groomUid = req.user[0].uid
			var brideUid = ''
		} else {
			var groomUid = ''
			var brideUid = ''
		}

		console.log('NAME')
		console.log(req.body.name)
		var newWedding = new Wedding({wid: newWid, name: req.body.name, bride_uid: brideUid, groom_uid: groomUid, date: req.body.date, location: req.body.location })
		console.log('NEW WEDDING')
		console.log(newWedding)
		newWedding.save(function (err, newWedding){
		
			User.update({uid: req.user[0].uid}, { role: req.body.role, wid: newWedding.wid}, function(err, numberAffected, raw){
			    console.log('Saved Role')
			    console.log(raw);
			    console.log(req.user)
			    console.log('New Wedding')
			    console.log(newWedding)
			    res.send('updated')



			})

	})



	})



}



exports.saveNewTask = function (req, res, next){
  console.log(req.body)
  console.log(req.user)
  console.log('Date')
  console.log(Date.now())

  var newTask = new Task({ creator: req.user[0].uid, creatorFirstName: req.user[0].firstName, created: Date.now(), name: req.body.name, details: req.body.details  })
  console.log(newTask.name);
  newTask.users.push(req.user[0].uid)

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
        var newUser = new User ({uid: wpUser.id, firstName: wpUser.name.givenName, lastName: wpUser.name.familyName, role: ''});

        newUser.save(function (err, newUser) {
          console.log('saved' + newUser.id);
          done(null, user[0]);
        });
        
        

      } else {

        done(null, user[0]);
        console.log('serialized');
      }

    })
}

exports.findLocal= function(wpUser, done){  

	  	console.log('Sign in User')
  		console.log(wpUser); 

  User.find({uid: wpUser.email}, function(err, user){

  		console.log('Sign in User')
  		console.log(user);
      if(user.length == 0){

      	return done(null, false, { message: 'User Does Not Exist.' });


        
        

      } else {

      	theUser = user[0];
        done(null, theUser);
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
          console.log(newUser)
          done(null, newUser);
        });
        
        

      } else {

        return done(null, false, { message: 'User Exists.' });

        
      }

    })
}



exports.User = User;
exports.Task = Task;









