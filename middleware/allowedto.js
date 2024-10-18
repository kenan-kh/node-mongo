const apperror =require('../utils/appError')
module.exports=(...roles)=>{
  return (req,res,next)=>{
  if(!roles.includes(req.currentuser.role)){
return next (apperror.create("this role is not authorized",401,))
  }
    next();
  }
}