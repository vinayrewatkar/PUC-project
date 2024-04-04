require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const connectdb = require("./utils/db");


const corsOption = {
    origin:"http://localhost:5173",
    methods:"GET,POST,DELETE,PUT,PATCH",
    Credentials:true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use("/api/auth", authRouter);


const PORT = 5000;
connectdb().then(() =>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    

// app.get("/", (req, res) => {
//     res.send("Welcome to the root!");
// });
