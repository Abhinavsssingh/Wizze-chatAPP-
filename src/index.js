const express = require("express")
const App = express()
const Rout = require("./routes/route")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://AbhinavSIngh:9936522959@cluster0.wtmx5b4.mongodb.net/wizee", { useNewUrlParser: true })
 .then(()=> console.log("MongoDb connected"))
 .catch((error)=>console.log(error))


const Port = process.env.PORT || 3000

App.use("/",Rout)

App.listen(Port,console.log(`express app running on port ${Port}`))

