var mongoose =require('mongoose');
var FoodTruck =require('./foodtruck');
var Schema=mongoose.Schema;
var ReviewSchema= new Schema({
  title:{
    type:String,
    required:true
  },
  text:{
    type:String,
  },
  foodtruck:{
    type:Schema.Types.ObjectId,
    ref: 'FoodTruck',
    required:true
  }
});
module.exports=mongoose.model("Review",ReviewSchema);
