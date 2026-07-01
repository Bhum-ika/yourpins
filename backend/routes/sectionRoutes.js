const express=require('express');
const router=express.Router();

const { getAllSections, createSection, deleteSection } = require("../controllers/sectionController");
const protect=require("../middleware/auth")

router.get("/",protect,getAllSections);
router.post("/",protect,createSection);
router.delete("/:id",protect,deleteSection);

module.exports=router;