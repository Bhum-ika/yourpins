const express = require("express");
const router = express.Router();
const { getAllLinks, createLink, updateLink, toggledStar, deleteLink ,getStarredLinks} = require("../controllers/linkController");
const protect=require("../middleware/auth")

router.get("/",protect, getAllLinks);
router.post("/",protect, createLink);
router.patch("/:id",protect, updateLink);
router.patch("/:id/star",protect, toggledStar);
router.delete("/:id",protect, deleteLink);
router.get("/starred",protect,getStarredLinks);

module.exports = router;