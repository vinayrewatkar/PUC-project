const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectdb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Connection failed");
        process.exit(0);
    }
};

module.exports = connectdb;