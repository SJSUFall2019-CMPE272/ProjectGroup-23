const mongoose = require('mongoose');
// Defining the structure of how the data 
// will be stored in the mongodb
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
