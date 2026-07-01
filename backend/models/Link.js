const mongoose=require('mongoose');

const linkSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    starred:{
        type:Boolean,
        default:false
    },
    section:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        required:true,
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
},{timestamps:true});

module.exports=mongoose.model("Link",linkSchema);