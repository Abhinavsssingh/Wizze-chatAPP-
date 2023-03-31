const express = require("express")
const router = express.Router()
const {registerUser,login} = require("../controller/userController")

router.post("/user/register",registerUser)
router.post("/user/login",login)


module.exports = router
