const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

exports.OCR = async (req, res) => {
    try {
        const image = req.files.images;
        if (!image) {
            return res.status(400).json({ message: 'No image file sent' });
        }

        const filename = uuidv4() + '_' + image.name;
        const filepath = '/tmp/' + filename;

        image.mv(filepath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error saving image file' });
            }

            

            try {
                // Perform OCR using the saved file
                const formData = new FormData();
                formData.append('image', fs.createReadStream(filepath));

                const options = {
                    method: 'POST',
                    url: 'https://ocr43.p.rapidapi.com/v1/results',
                    headers: {
                        'X-RapidAPI-Key': '10e9c846ecmshd749ecfc37dd811p1a5c32jsn0722a13a0338',
                        'X-RapidAPI-Host': 'ocr43.p.rapidapi.com',
                        ...formData.getHeaders(),
                    },
                    data: formData
                };

                const response = await axios.request(options);

                // Delete the temporary file after OCR operation
                fs.unlinkSync(filepath);

                res.status(200).json({
                    message: 'OCR done',
                    data: response.data
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error performing OCR' });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error in OCR' });
    }
}