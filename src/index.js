const express = require("express")
const App = express()
const Rout = require("./routes/route")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const multer = require("multer")
dotenv.config()

App.use(multer().any())
App.use(express.json())


mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
 .then(()=> console.log("MongoDb connected"))
 .catch((error)=>console.log(error))


const Port = process.env.PORT || 3000

App.use("/",Rout)

App.use(function(req,res){
    res.status(404).send({status:false,message:"incorrect url"})
})

App.listen(Port,console.log(`express app running on port ${Port}`))

