const user =require('../models/user.model')
const jwt =require('jsonwebtoken')
const asyncwrapper =require('../middleware/asyncwrapper')
const apperror =require('../utils/appError')
const bcrypt =require('bcryptjs')
const {validationResult} = require('express-validator');
const generatejwt = require('../utils/generatejwt')
const get_all_users =asyncwrapper(
  async (req,res)=>{
  let limit =+req.query.limit||10;
let page=+req.query.page||1;
let skip =(page-1)*limit;

let users = await user.find({},{"__v":false,"password":false}).limit((limit)).skip(skip);

res.status(200).json({status:"success",data :{users}})

}
  
)
const register=asyncwrapper(
async (req,res,next)=>{
 const {first_name,last_name,email,password,role}=req.body
const olduser =await user.findOne({email:email})
if(olduser){
  const error= apperror.create('user already exist ',400,"fail")
  next(error)
}
const hashpassword=  await  bcrypt.hash(password,10)
const newuser = new user({
  first_name,
  last_name,
  email,
password:hashpassword,
role,
avatar:req.file.filename
 })
//generate jwt token
let token =await generatejwt({email : newuser.email,id :newuser._id,role:newuser.role})
await newuser.save()
res.status(201).json({status :"success" ,data :newuser,token:token});

  }
)

const login=asyncwrapper(
  async(req,res,next)=>{
    const {email,password}=req.body
     if(!email && !password){
       const error= apperror.create("error in password or email",400,"fail")
next(error)
  }
const us =await user.findOne({email:email});
if(!us){
  const error= apperror.create("user not found",404,"fail")
  return next(error)
}
const matchedpassword =await bcrypt.compare(password,us.password)
if(us&& matchedpassword){
  let token =await generatejwt({email : us.email,id :us._id,role:us.role})

  res.status(200).json({status :"success" ,data :{token}});
}
else{
  const error= apperror.create("somthing wrong",500,"fail")
return next(error)
}
}
)



module.exports={
  get_all_users,
  register,
  login
}