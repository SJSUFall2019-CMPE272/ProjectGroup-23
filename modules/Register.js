const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	'uname':{
		type:String
	},
	'password':{
		type:String
	},
	'email':{
		type:String
	},
	'contactno':{
		type:Number
	},
	'address':{
		type:String
	}
});

const Post= module.exports = mongoose.model('Register',PostSchema);