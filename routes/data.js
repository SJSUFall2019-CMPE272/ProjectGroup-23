const express=require('express');
const router=express.Router();

const Post=require('../modules/Post');

router.post('/userdata',(req,res,next)=>{
	Post.find(,(err,req)=>{
		res.json(req);
	});
});
