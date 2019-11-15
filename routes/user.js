const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const User=require('../modules/User');

//Login details

//Get all posts //URL localhost:5000/posts
router.get('/',(req,res,next)=>{
	User.find()
		.exec()
		.then((docs)=>{
			res.status(200).json(docs);
		})
		.catch(err=>console.log(err));
});

router.put('/update/:id',(req,res,next)=>{
	let find=req.params.id;

	User.findById(find)
		.then(post=>{
					post.uname=req.body.uname;
					post.password=req.body.password;
					post.email=req.body.email;
					post.contactno=req.body.contactno;
					post.address=req.body.address;;
					post.Device=req.body.Device;
					post.currentexpense=req.body.currentexpense;
					post.reducedexpense=req.body.reducedexpense;
					post.timeschedule=req.body.timeschedule;
					post.rateperunit=req.body.rateperunit;
					post.optimizedrateperunit=req.body.optimizedrateperunit;
					post.save()
					.then(post=>{
						res.send(post);
					})
					.catch(err=>console.log(err));
				})
		.catch(err=>console.log(err));
	
});




module.exports = router;