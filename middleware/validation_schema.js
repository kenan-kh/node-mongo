const {body} = require('express-validator');
const validationschema=()=>{
  return [
    body('title').notEmpty().
    isLength({min:2}).
    withMessage("title at least 2 digits"),
  
    body('price').
    notEmpty().
    withMessage("price is require")
  ];
}
module.exports={validationschema}