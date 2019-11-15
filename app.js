const express=require('express');
const app=express();

const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const bcrypt = require('bcrypt');

app.use(express.json())

app.use(cors());
app.use(bodyParser.json());

app.post('/',(req,res)=>{
	res.send('Hello world');
});


const connection_url="mongodb+srv://ranjan272:ranjan272@cluster0-4jnub.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connection_url,{ useUnifiedTopology: true,useNewUrlParser:true })
	.then(()=>{
		console.log("DB connected");
	})
	.catch(()=>{
		console.log("DB not connected");
	});

const port=process.env.PORT || 5000;


const postRoutes=require('./routes/post');
const userRoutes=require('./routes/user');
const registerRoutes=require('./routes/register');


app.use('/posts',postRoutes);
app.use('/user',userRoutes);
app.use('/register',registerRoutes);


app.listen(port,()=>{
	console.log("Listening on "+port);
});