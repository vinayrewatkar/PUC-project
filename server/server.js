require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/router");
const connectdb = require("./utils/db");
const invokeModel = require("./controllers/invokeModel"); // Import the invokeModel function
const multer = require('multer');
const path = require('path');

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET,POST,DELETE,PUT,PATCH",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'temp')); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename for the uploaded file
  }
});

const upload = multer({ storage });

// Route for handling file upload and invoking the model
app.post('/invokeModel', upload.single('image'), invokeModel);

app.use("/api/auth", authRouter);

const PORT = 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});