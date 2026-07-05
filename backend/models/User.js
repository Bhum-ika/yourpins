const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
       type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        
    },
    username:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
        match: [/^[a-z0-9_-]{3,20}$/, "Username must be 3-20 characters and contain only lowercase letters, numbers, underscores, or hyphens"]

    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);