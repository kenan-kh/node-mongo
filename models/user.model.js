const mongoose =require('mongoose')
const { type } = require('os')
const validator =require('validator')


const userschema= mongoose.Schema({
  first_name:{
    type:String,
    required:true,
  },
    last_name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      unique:true,
      required:true,
      validate:[validator.isEmail,"filed must be valid"]
    },
    password:{
      type:String,
      required:true,
    },
    role:{
      type:String,
      enum:["USER","ADMIN","MANGER"],
      default:"USER"
    },
    avatar :{
      type:String,
      default:'upload/person.png'
    }
})
module.exports=mongoose.model('user',userschema)