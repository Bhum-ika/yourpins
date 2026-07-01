const Link = require("../models/Link");

const getAllLinks = async (req, res) => {
  try {
    const filter=req.query.section?{section:req.query.section,user: req.user.id}:{user: req.user.id};
    const links = await Link.find(filter);
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLink = async (req, res) => {
  try {
    const { title, url, description, starred, section, } = req.body;
    const link = await Link.create({
      title,
      url,
      description,
      starred,
      section,
      user: req.user.id
    });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLink = async (req, res) => {
  try {
    const link = await Link.findOneAndUpdate( { _id: req.params.id, user: req.user.id }, req.body, {
      new: true,
    });
      if (!link) return res.status(404).json({ message: "Link not found" });
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLink = async (req, res) => {
  try {
    const link = await Link.findOneAndDelete( { _id: req.params.id, user: req.user.id },);
    if (!link) return res.status(404).json({ message: "Link not found" });
    res.status(200).json({ message: "Link deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggledStar = async (req, res) => {
  try {
    const link = await Link.findOne( { _id: req.params.id, user: req.user.id });
    if (!link) return res.status(404).json({ message: "Link not found" });
    link.starred = !link.starred;
    await link.save();
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStarredLinks=async(req,res)=>{
  try{
    const links=await Link.find({user:req.user.id,starred:true}).populate("section","name");
  res.status(200).json(links);
  }catch(err){
  res.status(500).json({message:error.message})
}
}

module.exports={getAllLinks, createLink, deleteLink,updateLink,toggledStar,getStarredLinks};