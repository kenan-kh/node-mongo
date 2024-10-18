const express=require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const app =express();
const cors =require('cors')
app.use(express.json());
const coursesrouter=require('./routes/courses.route')
const userrouter =require('./routes/user.route')
const path =require('path')
app.use('/api/courses',coursesrouter.router) // any api comming convertion to the courserouter
app.use('/api/users',userrouter.router)

app.use('/upload',express.static(path.join(__dirname,'upload')))

const url =String( process.env.MONGO_URL);
mongoose.connect(url)
.then(()=>{
  console.log("success")
}).catch((err)=>{
  console.log(err.message)
});
 
app.all('*',(req,res,next)=>{
  res.status(404).json({status:"error",message:"this resourse is not available"})
})

app.use((error,req,res,next)=>{
      res.status(error.statuscode||500).json({status:error.statustext||"error", message:error.message,data:null}) 

})
app.listen(process.env.PORT,()=>{
console.log("port 3000 is running")
});