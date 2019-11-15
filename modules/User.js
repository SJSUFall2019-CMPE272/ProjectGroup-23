const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	'FName':{
		type:String
	},
	'LName':{
		type:String
	},
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
	},
	'Device':{
		type:String
	},
	'currentexpense':{
		type:String
	},
	'reducedexpense':{
		type:String
	},
	'timeschedule':{
		type:String
	},
	'rateperunit':{
		type:String
	},
	'optimizedrateperunit':{
		type:String
	}

});

const Post= module.exports = mongoose.model('User',PostSchema);