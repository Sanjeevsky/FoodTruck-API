const mongoose =require('mongoose');
var Review =require('./review');

 var Schema=mongoose.Schema;
 var foodtruckSchema=new Schema({
   name:{
     type:String,
     required:true
 },
foodtype:{
  type:String,
  required:true
},
avgcost:Number,
geometry:{
  type:{type:String,default:"Point"},
  coordinates:[Number]
},
reviews:[{
  type:Schema.Types.ObjectId,
  ref:"Review"
}]
});

 module.exports=mongoose.model("FoodTruck",foodtruckSchema);
