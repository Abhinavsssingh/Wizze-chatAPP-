const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    sender:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: true,
    },
    content:{ 
        type:String,
        trim:true
    },
    chat:{type:mongoose.Schema.Types.ObjectId,
    ref:"Chat"
    },
},{timestamps:true})

module.exports = mongoose.Model("Message",MessageSchema)