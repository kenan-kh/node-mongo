
const express = require("express");
const router= express.Router();

var coursecontroller=require('../controllers/courses.controller');
var {validationschema}=require('../middleware/validation_schema')
const verfiytoken =require('../middleware/verfiy_token')
const allowedto =require('../middleware/allowedto')

// get courses
router.get('/',coursecontroller.get_all_courses);
// get single courses

router.get('/:courseId',coursecontroller.get_course);
//create new course

router.post('/',verfiytoken,validationschema(),
coursecontroller.add_course
);

//update course
router.patch('/:courseId',coursecontroller.update_course
);

//delete course
router.delete('/:courseId',verfiytoken,allowedto("ADMIN"),coursecontroller.delete_course);


module.exports={router}