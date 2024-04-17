const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const invokeModel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }

    const imageFilePath = req.file.path;
    const python = spawn('python', [
      'E:/MERN projects/Licence-Plate-Detection-using-YOLO-V8/ultralytics/yolo/v8/detect/predict.py',
      'model=E:/MERN projects/Licence-Plate-Detection-using-YOLO-V8/newpts.pt',
      `source=${imageFilePath}`
    ]);

    python.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
      if (code !== 0) {
        console.log(`python script exited with code ${code}`);
      }
      res.status(200).json({ message: 'Image received and processing initiated' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = invokeModel;