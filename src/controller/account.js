var mongoose =require('mongoose');
var {Router} =require('express');
var Account =require('../model/account');
var bodyParser =require('body-parser');
var passport =require('passport');
var config =require('../config');
var {generateAccessToken,respond,authenticate} =require("../middleware/authmiddleware");

module.exports=({config,db})=>{
  var api=Router();

  //Register user

  api.post("/register",(req,res)=>{
    Account.register(new Account({
      username:req.body.email
    }),req.body.password,function(err,account) {
    if(err){
      res.send(err);
    }
    passport.authenticate(
      'local',{
      session: false
    })(req,res,()=>{
        res.status(200).send("Successfully Created an Account");
  });
  });
});

api.post('/login',passport.authenticate(
  'local',
  {'session':false,
  scope:[]}
),generateAccessToken,respond);

api.get('/logout',authenticate,(req,res)=>{
  res.logout();
  res.status(200).send("Logout Successfully");
});

api.get('/me',authenticate,(req,res)=>{
  res.status(200).json(req.user);
});
return api;
}
