var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/' + 'myprojectdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var taskSchema = mongoose.Schema({
    uid: Number,
    name: String,
    details: String,
    id: Number

});

var userSchema = mongoose.Schema({
	uid: Number,
	firstName: String,
	lastName: String,
	profilepic: String

});

var Task = mongoose.model('Task', taskSchema);

var User = mongoose.model('User', userSchema);

// var newTask = new Task({ uid:'28805624', name: 'With id', details: 'Go to jewler and get rings', id: '3' });
// console.log(newTask.name);

// var newUser = new User ({id: 1234, firstName: 'Andrew', lastName: 'Pierce', profilepic: 'http://imgur.com/yyhs'});


// newUser.save(function (err, newUser) {
// 	console.log('saved' + newUser.id);
// });


exports.findTasks = function (req, res) {
	console.log(req.sessionStore.sessions);
	return Task.find({'uid': req.id}, function (err, tasks) {
		if (!err) {
		        res.jsonp(tasks);
		        console.log('sent');
	  	} else {
	    		console.log(err);
	  	}
	});
}

exports.findOrCreateUser = function (fbuser){
	 User.find({id: fbuser.id}, function(err, user){
		if(!user){
			// console.log(fbuser);
			var newUser = new User ({id: fbuser.id, firstName: fbuser.name.givenName, lastName: fbuser.name.familyName, profilepic: ''});

			newUser.save(function (err, newUser) {
				console.log('saved' + newUser.id);
			});

			// return newUser;
		} else {
			// return user;
			
			console.log(fbuser.id);
			console.log(user);
		}
	})
}

exports.User = User;

// exports.newUser = function (user){
// 	var newUser = new User ({id: req., firstName: 'Andrew', lastName: 'Pierce', profilepic: 'http://imgur.com/yyhs'});

// 	newUser.save(function (err, newUser) {
// 		console.log('saved' + newUser.id);
// 	});
// }







