import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import router from "./signup/route.js";

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connect to DB");
})
.catch((error)=>{
    console.log(error);
    
})

const app= express();
app.use(express.json());


app.listen(3000, ()=>{
    console.log("Server is running......")
})

app.use('/api/signup',router)