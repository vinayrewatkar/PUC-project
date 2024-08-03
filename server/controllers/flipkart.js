const https = require('https');

const searchFlipkartProducts = (req, res) => {
  const { keyword } = req.body;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  const options = {
    method: 'GET',
    hostname: 'real-time-flipkart-api.p.rapidapi.com',
    port: null,
    path: `/product-search?q=${encodeURIComponent(keyword)}&page=1&sort_by=popularity`,
    headers: {
      'x-rapidapi-key': '0f88946113mshf4030a3a9427bf1p1c3f23jsnd5931bcdc108',
      'x-rapidapi-host': 'real-time-flipkart-api.p.rapidapi.com'
    }
  };

  const request = https.request(options, (response) => {
    const chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      try {
        const parsedBody = JSON.parse(body);
        // Check if the response structure is as expected
        if (parsedBody.products) {
          res.json(parsedBody.products);
        } else {
          res.status(500).json({ error: 'Unexpected response format' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to parse response', details: error.message });
      }
    });
  });

  request.on('error', (error) => {
    res.status(500).json({ error: 'Request error', details: error.message });
  });

  request.end();
};

module.exports = {
  searchFlipkartProducts
};
