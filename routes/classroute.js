const express = require('express')
const router = express.Router()
const classcontroller = require("../controllers/classcontroller")
const { createclassValidation  } = require('../validation/classvalidation');
const { validate } = require('../validation/validate');

router.param("classId", classcontroller.getclass)

router.post("/class", /* createclassValidation(), validate, */ classcontroller.create)

router.get("/class", classcontroller.findAll)

router.get("/class/:classId", classcontroller.findOne)

router.put("/class/:classId", classcontroller.update)

router.delete("/class/:classId", classcontroller.delete)

module.exports = router


