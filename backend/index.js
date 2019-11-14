//package imports
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var corsPrefetch = require("cors-prefetch-middleware");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var kafka = require('./kafka/client');

//api declarations
var Database=require('../backend/Database');
var Login=require('./api/Login');
var Signup=require('./api/Signup');

//few constants declarations
const GlobalVar = require("../backend/GlobalVar");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//express delcarations
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(__dirname + "/images"));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({origin: GlobalVar['hostedAddress'] + ":3000", credentials:true})); //self note-use cors to allow cross origin resource sharing
app.use(
  session({
    secret: "nachi_kaa_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);//self note-we use express session to maintain session data
app.use(bodyParser.json());

// The passport JWT strategy
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = GlobalVar['secret'];
var userStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  User.find({user_email : jwt_payload.email}, 
    function (res) {
      console.log('user authenticated', jwt_payload);
      next(null,jwt_payload);
  }, function (err) {
    console.log('user NOT authenticate', jwt_payload);
      next(null, false);
  });
});

passport.use('userAuth',userStrategy);

//all the api calls
app.post("/login", function(req, res) {
  Login.login(req,res,conn,bcrypt)
});

app.post("/signup", function(req, res) {
  Signup.signup(req,res,conn,bcrypt,saltRounds)
});

app.listen(3001);
console.log("Server Listening on port 3001");
