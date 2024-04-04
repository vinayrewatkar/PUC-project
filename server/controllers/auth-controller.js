const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const home = async(req,res) =>{
    try {
        res.status(200).send("Welcome from router");
    } catch (error) {
        console.log(error);
    }
}

const register = async(req,res) =>{
    try {
        const {username , email , phone , password} = req.body;
        const UserExists = await User.findOne({email : email});
        if(UserExists){
            return res.status(400).json({msg:"email already exists"});
        }
        const hash_password = await bcrypt.hash(password,10);
        const newUser = await User.create({username , email , phone , password:hash_password})

        res.status(201).json({msg:newUser ,
             token: await newUser.generateToken(),
             userId: newUser._id > toString(),
            });
    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const user = await bcrypt.compare(password,userExists.password);
        if(user){
            res.status(200).json({
                msg: "login successful",
                token: await userExists.generateToken(),
                userId: userExists._id.toString(),
            });
        }
        else{
            res.status(401).json({message:"Invalid Email or password"});
        }
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}
module.exports = { home , register , login};