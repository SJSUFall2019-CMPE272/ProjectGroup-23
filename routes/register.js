const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const Register=require('../modules/Register');

//Login details

//Get all posts //URL localhost:5000/posts
router.get('/',(req,res,next)=>{
	Register.find()
	 .exec()
		.then((docs)=>{
			res.status(200).json(docs);
		})
		.catch(err=>console.log(err));
});


//Add new post //URL localhost:5000/posts/add
router.post('/add',(req,res,next)=>{
	const un=req.body.uname;
	const pass=req.body.password;
	const cno=req.body.contactno;
	const email=req.body.email;
	const addr=req.body.address;

	newReg= new Register({
		uname:un,
		password:pass,
		email:email,
		contactno:cno,
		address:addr
	});
	newReg.save()
		   .then(post=>{
				res.json(post);
				res.send(post);
			})
		   .catch(err => console.log(err));

});


module.exports = router;