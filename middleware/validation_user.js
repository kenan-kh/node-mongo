const {body} = require('express-validator');
const validationschema=()=>{
  return [
    body('email').
    notEmpty().
    withMessage("email is require"),
  
    body('password').
    notEmpty().
    withMessage("password is require")
  ];
}
module.exports={validationschema}