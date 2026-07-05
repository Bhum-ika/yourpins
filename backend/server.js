const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const dbConnect = require('./config/database');
const sectionRoutes = require("./routes/sectionRoutes");
const linkRoutes = require("./routes/linkRoutes");
const authRoutes = require("./routes/authRoutes");
const publicRoutes=require("./routes/publicRoutes");

const PORT=process.env.PORT||5000;
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
dbConnect();
app.use("/api/sections", sectionRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/public",publicRoutes);

app.get('/',(req,res)=>{
    res.send('YourPins API is running...');
})

app.listen(PORT,()=>{
    console.log(`Server is runnning on port ${PORT}`);
})