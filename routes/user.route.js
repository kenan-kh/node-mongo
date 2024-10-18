
const express = require("express");
const multer=require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    const ext =file.mimetype.split('/')[1]
    const filename = `user-${Date.now()}.${ext}`
    cb(null,filename)
  }
})
const router= express.Router();
const userscontroller =require('../controllers/users.controller')
const validation_user =require('../middleware/validation_user')
const verfiytoken =require('../middleware/verfiy_token');
const appError = require("../utils/appError");

const filefilter =(req,file,cb)=>{
  const imgtype =file.mimetype.split('/')[0]
  if(imgtype=='image'){
    return cb(null,true)
  }
  else{
    return cb(appError.create('this file is not image',400),false)
  }
}
const upload =multer({storage: storage,
  fileFilter : filefilter})

 //get all user 
router.get('/',verfiytoken,userscontroller.get_all_users)

 //register
 router.post('/register',upload.single('avatar'),userscontroller.register)


 //log in
 router.post('/login',userscontroller.login)

module.exports={router}