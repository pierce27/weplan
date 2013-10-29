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



exports.User = User;









