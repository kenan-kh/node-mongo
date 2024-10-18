const {validationResult} = require('express-validator');
const course =require('../models/course.model');
const asyncwrapper =require('../middleware/asyncwrapper')
const apperror =require('../utils/appError')


const get_all_courses=asyncwrapper(
  async (req,res)=>{
  let limit =+req.query.limit||10;
let page=+req.query.page||1;
let skip =(page-1)*limit;

let courses = await course.find({},{"__v":false}).limit((limit)).skip(skip);

res.status(200).json({status:"success",data :{courses}})

}
  
)
const get_course =asyncwrapper(
async(req,res,next)=>{
    const courseid=req.params.courseId;
       let courseget=await course.findById(req.params.courseId);
       if(!courseget){
        const error= apperror.create('course not found',404,"fail")
        next(error)
      // return  res.stataus(404).json({status:"fail", data:{course:"course not found"}})
       }
  res.json({status:"success", data:{course:courseget}})
      
    }
    )

 const add_course=asyncwrapper(
 async(req,res,next)=>{
      const errors =validationResult(req);
    if(!errors.isEmpty()){
      const error= apperror.create(errors.array(),400,"fail")
next(error)
     }
    let newcourse =new course({
      title :req.body.title, // = new course(req.body);
      price:req.body.price
    });
await newcourse.save();
 res.status(201).json({status :"success" ,data :newcourse});
}
 )

 const update_course= asyncwrapper(
async(req,res)=>{
  const updatecourse   = await course.updateOne({_id:req.params.courseId},{...req.body})
  res.status(200).json({status:"success", data:{course:updatecourse}})
      }
    )
  const delete_course=asyncwrapper(
  async(req,res)=>{
        let courseid =req.params.courseId;
  const d =await course.deleteOne({_id:courseid})
 res.status(200).json({status:"success", data:null})
  
    }
  )
       module.exports={get_all_courses
        ,get_course
        ,add_course,
        update_course,
        delete_course
       }