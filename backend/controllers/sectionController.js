const Section=require("../models/Section");
const Link=require("../models/Link")

const getAllSections=async(req,res)=>{
    try{
        const sections=await Section.find({user:req.user.id});
        res.status(200).json(sections);
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const createSection=async(req,res)=>{
    try{
        const {name}=req.body;
        const section=await Section.create({name,user:req.user.id});
        res.status(201).json(section);
    }catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteSection=async(req,res)=>{
    try{
        const section=await Section.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if(!section){
            return res.status(404).json({message:"Section not found"});
        }
         await Link.deleteMany({ section: req.params.id });
        res.status(200).json({message:"Section deleted"});
    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const toggleSectionVisibility=async(req,res)=>{
    try{
        const section=await Section.findOne({_id:req.params.id,user:req.user.id});
        if(!section){
            return res.status(404).json({
                message:"Section not found"
            })
        }
        section.isPublic=!section.isPublic;
        await section.save();
        res.status(200).json(section);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports={getAllSections,createSection,deleteSection,toggleSectionVisibility};