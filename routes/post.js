const express=require('express');
const router=express.Router();

const Post=require('../modules/Post');

//Login details

//Get all posts //URL localhost:5000/posts
router.get('/',(req,res,next)=>{
	Post.find()
		.then((posts)=>{
			res.json(posts);
		})
		.catch(err=>console.log(err));
});


//Add new post //URL localhost:5000/posts/add
router.post('/add',(req,res,next)=>{
	const un=req.body.uname;
	const pass=req.body.password;

	newPost= new Post({
		uname:un,
		password:pass
	});
	newPost.save()
		   .then(post=>{
				res.json(post);
				res.send(post);
			})
		   .catch(err => console.log(err));

});

//Update a post
router.put('/update/:id',(req,res,next)=>{

	let id1=req.params.id;

	Post.findById(id1)
		.then(post=>{
			post.uname=req.body.uname;
			post.password=req.body.password;
			post.save()
				.then(post=>{
					res.send({
						message:'successfully updated',
						status:'success',
						post:post
					})
				})
				.catch(err=>console.log(err))
		})
		.catch(err=>console.log(err));

});

//Delete
router.delete('/:id',(req,res,next)=>{
	let id=req.params.id;

	Post.findById(id)
		.then(post=>{
					post.delete()
						.then(post=>{
							res.send({
								message:'post successfully deleted',
					 	 		status:'success',
					 	 		post:post
							})
						})
						.catch(err=>console.log(err))
		})
		.catch(err=>console.log(err))
});



module.exports = router;