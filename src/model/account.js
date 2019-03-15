const mongoose =require('mongoose');
const passportLocalMongoose =require('passport-local-mongoose');
const Schema=mongoose.Schema;
var Account=new Schema({
  email:String,
  password:String
});

Account.plugin(passportLocalMongoose);
module.exports=mongoose.model("Account",Account);
