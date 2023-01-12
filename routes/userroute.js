const express = require('express')
const router = express.Router()
const usercontroller = require("../controllers/usercontroller")


router.param("userId", usercontroller.getuser)

router.post("/user", usercontroller.create)

router.get("/user", usercontroller.findAll)

router.get("/user/:userId", usercontroller.findOne)

router.put("/user/:userId", usercontroller.update)

router.delete("/user/:userId", usercontroller.delete)

router.post("/login", usercontroller.adminlogin)

module.exports = router


