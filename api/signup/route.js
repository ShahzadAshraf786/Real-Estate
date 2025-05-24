import express from "express";
import User from "../modules/user.modules.js";
import bcryptjs from "bcryptjs"

const router = express.Router();

router.post("/signup", 
    async (req,res) => {
        try{
        const {username,email,password} = req.body;
        const hashedPassword= bcryptjs.hashSync(password,10)

        const user = await User.findOne({email})
        
        if (user){
            return res.json({error:"User already exists"},{status:400})
        }

        const newUser = new User ({username,email,password:hashedPassword})
        await newUser.save()
        return res.json("User created sucessfuly!",{status:201})
    }
    catch(error){
        // return req.json({error:error.message},{status:500})
        res.status(500).json(error.message);
    } 
    
}
)


export default router;