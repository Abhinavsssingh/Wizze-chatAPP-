const express = require("express")
const router = express.Router()
const {registerUser,login,allUser} = require("../controller/userController")
const {authentication} = require("../middilware/Auth")

router.post("/user/register",registerUser)
router.post("/user/login",login)
router.get("/user/allUsers",authentication,allUser)


module.exports = router
