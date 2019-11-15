const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	'uname':{
		type:String
	},
	'password':{
		type:String
	}
});

const Post= module.exports = mongoose.model('Login',PostSchema);