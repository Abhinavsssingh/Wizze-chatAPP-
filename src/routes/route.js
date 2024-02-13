const express = require("express")
const router = express.Router()
const {registerUser,login,allUser} = require("../controller/userController")
const {authentication} = require("../middilware/Auth")
const {getChat,GetAllchat,CreateGroupChat,reNameGC,addToGC,rmToGC} = require("../controller/chatController")

router.post("/user/register",registerUser)
router.post("/user/login",login)
router.get("/user/allUsers",authentication,allUser)


router.post("/chat/getChat",authentication,getChat)
router.get("/chat/GetAllchat",authentication,GetAllchat)
router.post("/chat/CreateGroupChat",authentication,CreateGroupChat)
router.post("/chat/reNameGC",authentication,reNameGC)
router.post("/chat/addToGC",authentication,addToGC)
router.post("/chat/rmToGC",authentication,rmToGC)
module.exports = router
