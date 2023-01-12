const express = require('express')
const router = express.Router()
const subjectcontroller = require("../controllers/subjectcontroller")
const { createsubjectValidation  } = require('../validation/subjectvalidation');
const { validate } = require('../validation/validate');

router.param("subjectId", subjectcontroller.getsubject)

router.post("/subject", /* createsubjectValidation(), validate, */ subjectcontroller.create)

router.get("/subject", subjectcontroller.findAll)

router.get("/subject/:subjectId", subjectcontroller.findOne)

router.put("/subject/:subjectId", subjectcontroller.update)

router.delete("/subject/:subjectId", subjectcontroller.delete)

module.exports = router


