const express = require('express')
const router = express.Router()
const studentcontroller = require("../controllers/studentcontroller")
const { createstudentValidation  } = require('../validation/studentvalidation');
const { validate } = require('../validation/validate');

router.param("studentId", studentcontroller.studentId)

router.post("/student",/*  createstudentValidation(), validate, */ studentcontroller.create)

router.get("/student", studentcontroller.findAll)

router.get("/student/:studentId", studentcontroller.findOne)

router.put("/student/:studentId", studentcontroller.update)

router.delete("/student/:studentId", studentcontroller.delete)

module.exports = router


