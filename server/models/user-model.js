const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:String,
        require:true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save" , async function(next){
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const saltround = await bcrypt.genSalt(10);
        const hash_password = bcrypt.hash(user.password, saltround);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_TOKEN,
        {
            expiresIn: "30d",
        }
        )
    } catch (error) {
        console.log(error);
    }

};

const User = new mongoose.model("User",userSchema);
module.exports = User;