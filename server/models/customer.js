const mongoose=require("mongoose");

const CustomerSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    details:{
        type:String,
        required:true,
    }
})

const Customer=mongoose.model("Customer",CustomerSchema)
module.exports=Customer