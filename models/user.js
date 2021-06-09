const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    email : {
        type :String,
        required : true
    },
    pic : {
        type : String,
        default: "https://res.cloudinary.com/instagramclone-ir/image/upload/v1623003136/51f6fb256629fc755b8870c801092942_ramvwg.png",
        required : true
    },
    password : {
        type : String,
        required : true
    },
    followers : [
        {
            type : ObjectId,
            ref:"User"
        }
    ],
    following : [
        {
            type : ObjectId,
            ref:"User"
        }
    ]
})



mongoose.model("User",userSchema)