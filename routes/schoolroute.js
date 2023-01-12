const express = require('express')
const router = express.Router()
const schoolcontroller = require("../controllers/schoolcontroller")
const { createschoolValidation  } = require('../validation/schoolvalidation');
const { validate } = require('../validation/validate');


router.param("schoolId", schoolcontroller.getschool)

router.post("/school", /* createschoolValidation(), validate, */ schoolcontroller.create)

router.get("/school", schoolcontroller.findAll)

router.get("/school/:schoolId", schoolcontroller.findOne)

router.put("/school/:schoolId",  schoolcontroller.update)

router.delete("/school/:schoolId", schoolcontroller.delete)

module.exports = router


