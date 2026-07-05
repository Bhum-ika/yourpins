const User=require("../models/User");
const Section=require("../models/Section");
const Link=require("../models/Link");

const getPublicVault=async(req,res)=>{
    try{
        const {username}=req.params;
        const user=await User.findOne({username:username.toLowerCase()});
        if(!user){
            return res.status(404).json({message:"Vault not found"})
        }
        const sections=await Section.find({user:user._id,isPublic:true}).sort({createdAt:-1});
        const sectionIds=sections.map((s)=>s._id);
        const links=await Link.find({section:{$in:sectionIds}}).sort({createdAt:-1});

        const linksBySection={};
        links.forEach((link)=>{
            const key=link.section.toString();
            if(!linksBySection[key])linksBySection[key]=[];
            linksBySection[key].push({
                id:link._id,
                title:link.title,
                url:link.url,
                description:link.description,
                starred:link.starred,
            })

        })
        const vault=sections.map((section)=>({
            id:section._id,
            name:section.name,
            links:linksBySection[section._id.toString()] || [],
        }))

        res.status(200).json({
            username:user.username,
            name:user.name,
            sections:vault,
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={getPublicVault};