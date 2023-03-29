const express = require("express")
const router = express.Router()

router.get("/ww",function(req,res){
    res.send({message:"running"})
})

module.exports = router
