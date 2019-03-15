const express =require('express');
const config =require('../config');
const middleware =require('../middleware');
var initalizeDb =require("../db");
const foodtruck =require('../controller/foodtruck');
const account =require('../controller/account');

var router=express();


initalizeDb(db=>{
  //inital middleware
  router.use(middleware({config,db}));

  //api routes v1(/v1)
  router.use('/foodtruck',foodtruck({config,db}));
  // api routes account
  router.use("/account",account({config,db}));
});
module.exports= router;
