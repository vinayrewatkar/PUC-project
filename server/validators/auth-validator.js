const {z} = require("zod");

const signupSchema = z.object({
    username : z
    .string({required_error: "Name is required"})
    .trim()
    .min(3,{message:"name must be atleast 3 characters"}),

    email : z
    .string({required_error: "email is required"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message:"email must be atleast 3 characters"})
    .max(255,{message:"Email must be 255 less character"}),


    


    password : z
    .string({required_error: "password is required"})
    .trim()
    .min(7,{message:"password must be atleast 7 characters"})
    .max(1024,{message:"password must be atleast 1024 characters"}),



});
module.exports = signupSchema;