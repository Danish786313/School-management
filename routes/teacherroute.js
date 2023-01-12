const express = require('express')
const router = express.Router()
const teachercontroller = require("../controllers/teachercontroller")
const { createteacherValidation  } = require('../validation/teachervalidation');
const { validate } = require('../validation/validate');

router.param("teacherId", teachercontroller.getteacher)

router.post("/teacher", /* createteacherValidation(), validate, */ teachercontroller.create)

router.get("/teacher", teachercontroller.findAll)

router.get("/teacher/:teacherId", teachercontroller.findOne)

router.put("/teacher/:teacherId",  teachercontroller.update)

router.delete("/teacher/:teacherId", teachercontroller.delete)

module.exports = router


