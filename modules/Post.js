const mongoose = require('mongoose');
// Schema for storing login credentials


const PostSchema = mongoose.Schema({
	'uname':{
		type:String
	},
	'password':{
		type:String
	}
});

const Post= module.exports = mongoose.model('Login',PostSchema);
