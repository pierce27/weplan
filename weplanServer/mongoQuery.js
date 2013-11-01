var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/' + 'myprojectdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var taskSchema = mongoose.Schema({
    uid: Number,
    creator: String,
    name: String,
    details: String

});

var userSchema = mongoose.Schema({
	uid: Number,
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
  User.update({uid: req.user[0].uid}, { role: req.body.role }, function(err, numberAffected, raw){
    console.log('Saved Role')
    console.log(raw);

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



exports.User = User;
exports.Task = Task;









