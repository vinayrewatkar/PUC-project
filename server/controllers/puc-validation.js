const axios = require('axios');

exports.validatePUC = async (req, res) => {
    try {
        const { vehicleNumber } = req.body;

        if (!vehicleNumber) {
            return res.status(400).json({
                error: 'Vehicle number is required'
            });
        }

        const options = {
            method: 'POST',
            url: 'https://rto-vehicle-information-verification-india.p.rapidapi.com/api/v1/rc/vehicleinfo',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '139c90d5bdmsh887cd3b63935516p1969a0jsn785beb400347',
              'X-RapidAPI-Host': 'rto-vehicle-information-verification-india.p.rapidapi.com'
            },
            data: {
                reg_no: vehicleNumber,
                consent: 'Y',
                consent_text: 'I hereby declare my consent agreement for fetching my information via AITAN Labs API'
            }
        };

        try {
            const response = await axios.request(options);
            const vehicleInfo = response.data;
            
            // Validate PUC
            const isValidPUC = checkPUCValidity(vehicleInfo);
            
            if (isValidPUC) {
                res.status(200).json({
                    message: 'PUC is valid',
                    data: vehicleInfo
                });
            } else {
                res.status(400).json({
                    message: 'PUC is invalid or expired',
                    data: vehicleInfo
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

function checkPUCValidity(vehicleInfo) {
    const pucUptoDate = vehicleInfo.result.vehicle_pucc_details.pucc_upto;
    if (pucUptoDate) {
        const currentDate = new Date();
        const pucUpto = new Date(pucUptoDate.replace(/-/g, '/')); // Convert date string to Date object
        return pucUpto > currentDate; // Check if PUC expiry date is in the future
    } else {
        return false; // PUC information not available or invalid
    }
}