const express=require('express');
const router=express.Router();

const { getAllSections, createSection, deleteSection ,toggleSectionVisibility} = require("../controllers/sectionController");
const protect=require("../middleware/auth")

router.get("/",protect,getAllSections);
router.post("/",protect,createSection);
router.delete("/:id",protect,deleteSection);
router.patch("/:id/visibility",protect,toggleSectionVisibility)
module.exports=router;