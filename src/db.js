const mongoose =require('mongoose');
const config =require('./config');

module.exports=function(callback){

  var db=mongoose.connect(config.mongoUrl, { useNewUrlParser: true }).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.set('useCreateIndex', true);
  callback(db);
}
