const mongoose =require('mongoose');
const {Router} =require('express');
const FoodTruck =require('../model/foodtruck');
const bodyParser =require('body-parser');
const {authenticate} =require('../middleware/authmiddleware');
const Review =require("../model/review");

module.exports= ({config,db})=>{
  var api=Router();

  //v1/resturant/add
  api.post('/add',authenticate,(req,res)=>{
    var newFoodTruck=new FoodTruck();
    newFoodTruck.name=req.body.name;
    newFoodTruck.foodtype=req.body.foodtype;
    newFoodTruck.avgcost=req.body.avgcost;
    newFoodTruck.geometry.coordinates=req.body.geometry.coordinates;
    newFoodTruck.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message:"FoodTruck Created Successfully"});
    });
  });

//Getting All The FoodTruck
api.get("/",(req,res)=>{
  FoodTruck.find({},(err,foodtruck)=>{
    if (err) {
      res.send(err);
    }
    res.json(foodtruck);
  });
});

//Getting FoodTruck by ID
api.get("/:id",(req,res)=>{
  FoodTruck.findById(req.params.id,(err,foodtruck)=>{
    if (err) {
      res.send(err);
    }
    res.json(foodtruck);
  });
});

//Updating FoodTruck
api.put("/:id",authenticate,(req,res)=>{
  FoodTruck.findById(req.params.id,(err,foodtruck)=>{
    if (err) {
      res.send(err);
    }
    if(foodtruck==null){
      res.status(404).send("FoodTruck Not Found");
    }
    //foodtruck.name=req.body.name;
    foodtruck.foodtype=req.body.foodtype;
    foodtruck.avgcost=req.body.avgcost;
    foodtruck.geometry.coordinates=req.body.geometry.coordinates;
    foodtruck.save(err=>{
      if(err)
      {
        res.send(err);
      }
      res.json({message:"FoodTruck Updated Successfully"});
    });
  });
});
//v1/foodtruck/remove
api.delete("/:id",authenticate,(req,res)=>{
  FoodTruck.findById(req.params.id,(err,foodtruck)=>{
    if(err){
      res.status(500).send(err);
      return;
    }
    if(foodtruck==null)
    {
      res.status(404).send("FoodTruck Not Found");
      return;
    }
    FoodTruck.remove({
      _id:req.params.id
    },(err,foodtruck)=>{
      if (err) {
        res.send(err);
        return;
      }
      Review.remove({foodtruck:req.params.id},(err,review)=>{
        if(err)
        {
          res.send(err);
        }
        res.json({message:"Deleted Reviews"});
      });
      res.json({message:"FoodTruck deleted Successfully"});
    });
  });

});

//Adding Review Food Truck by Id
api.post('/reviews/add/:id',authenticate,(req,res)=>{
  FoodTruck.findById(req.params.id,(err,foodtruck)=>{
    if(err)
    {
      res.send(err);
    }
    var newReview=new Review();
    newReview.title=req.body.title;
    newReview.text=req.body.text;
    newReview.foodtruck=foodtruck._id;
    newReview.save((err,review)=>{
      if(err)
      {
        res.send(err);
      }
      foodtruck.reviews.push(newReview);
      foodtruck.save((err)=>{
        if(err){
          res.send(err);
        }
        res.json({message:"Review Saved Successfully"});
      });
    });
  });
});

api.get('/reviews/:id',(req,res)=>{
  FoodTruck.findById(req.params.id,(err,foodtruck)=>{
    if(err)
    {
      res.send(err);
    }
    Review.find({foodtruck:req.params.id},(err,reviews)=>{
      if(err){
        res.send(err)
      }
        res.json(reviews);
    })

  });
});

  return api;
}
