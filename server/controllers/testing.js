const { spawn } = require('child_process');

exports.OCR = async (req, res) => {
    try {
        const image = req.files.images;
        if (!image) {
            return res.status(400).json({ message: 'No image file sent' });
        }

        

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error in OCR' });
    }
}