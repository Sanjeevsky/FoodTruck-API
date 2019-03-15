const jwt =require('jsonwebtoken');
const expressjwt =require('express-jwt');

const TOKENTIME= 60*60*24*30;
const SECRET="sdjkfvfdfgdgdfgcbvxcsfl fskfllkjff";
var authenticate= expressjwt({secret:SECRET});
var generateAccessToken=(req,res,next)=>{
  req.token=req.token || {};
  req.token=jwt.sign({
    id:req.user.id,
  },
SECRET,{
  expiresIn:TOKENTIME
});
next();
}
let respond=(req,res)=>{
  res.status(200).json({
    user:req.user.username,
    token:req.token
  });
}
module.exports={authenticate,generateAccessToken,respond};
