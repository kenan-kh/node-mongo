const jwt =require('jsonwebtoken');
const verfiytoken =(req,res,next)=>{
authheader =req.headers['Authorization']||req.headers['authorization'];
if(!authheader){
  res.status(401).json({message :"token is required"})
}
  const token =authheader.split(' ')[1];
  try{
let currentuser= jwt.verify(token,process.env.JWT_SECRET_KEY)
req.currentuser=currentuser
  next()}
catch(err){
res.status(401).json({status:401, message :"invalid token"})
}
}

module.exports =verfiytoken