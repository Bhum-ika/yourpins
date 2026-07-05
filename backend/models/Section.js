const mongoose=require('mongoose');

const sectionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isPublic:{
        type:Boolean,
        default:false,
    }

},{timestamps:true});


module.exports=mongoose.model("Section",sectionSchema);