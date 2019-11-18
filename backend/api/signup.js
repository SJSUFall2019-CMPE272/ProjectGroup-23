var Customer = require('../models/Customer');
var Restaurant = require('../models/Restaurant');
const GlobalVar = require("../GlobalVar");
var jwt = require('jsonwebtoken');

signup=(req, res, conn, bcrypt,saltRounds)=> {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  let zip = req.body.zip;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let city = req.body.city;
  let state = req.body.state;
  let address = req.body.address;
  

    var user = User({
        email : email,
        password : password,
        zip : zip,
        fname : fname,
        lname : lname,
        city : city,
        state : state,
        address : address,
    });
    Customer.find({}, function(err, results) {
      if (err) throw err;
      let cust_data = results;
      let flag = 0;
      cust_data.forEach(element => {
        if (username == element.cust_email) {
          flag = 1;
        }
        cust_id = element.cust_id;
        console.log("in customer signup with cust id:", cust_id);
      });
      cust_id++;
      if (flag == 1) {
        console.log("customer id exists");
        res.send("exists");
      } else {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          cust.cust_password=hash;
          cust.save(function(err) {
            if (err) throw err;
          
            console.log('User saved successfully!');
            console.log("cookie time");
                  res.cookie("cookie", "customer", {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("email", username, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("name", name, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("cust_id", cust_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("idGeneric", "c_" + cust_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  let token=jwt.sign({email: username},GlobalVar['secret']);
                  token="Bearer "+token;
                  console.log('token is----',token);
                  res.setHeader("Access-Control-Expose-Headers", "Authorization");
                  res.header({"Authorization": token})
                  let cookieObj={cookie:"customer", email:username, name:name, cust_id:cust_id, idGeneric:"c_" + cust_id}
                  res.send(cookieObj);
                  res.end("Successful Account Creation");
          });
      // object of all the users
      console.log('custs',results);
      
    });
  }});
}
exports.signup=signup;