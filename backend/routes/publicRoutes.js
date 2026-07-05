const express=require('express');
const router=express.Router();

const {getPublicVault}=require("../controllers/publicController");
router.get("/:username",getPublicVault);

module.exports=router;
