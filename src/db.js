const mongoose =require('mongoose');
const config =require('./config');
mongoose.Promise=global.Promise;
module.exports=function(callback){

  var db=mongoose.connect(process.env.MONGODB_URI);
  callback(db);
}
