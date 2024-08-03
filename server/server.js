require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/router");
const connectdb = require("./utils/db");
const multer = require('multer');
const path = require('path');

const corsOption = {
  origin: "http://localhost:3000",
  methods: "GET,POST,DELETE,PUT,PATCH",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'temp')); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const upload = multer({ storage });

// Change this line
app.use("/api", authRouter);

// Add this for debugging
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

const PORT = 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});