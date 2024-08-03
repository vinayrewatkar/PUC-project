const axios = require('axios');

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.body;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    const query = encodeURIComponent(keyword); // Encode the keyword for URL
    const options = {
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/search',
      params: {
        query: query,
        page: '1',
        country: 'IN',
        sort_by: 'LOWEST_PRICE',
        product_condition: 'ALL'
      },
      headers: {
        'x-rapidapi-key': '0f88946113mshf4030a3a9427bf1p1c3f23jsnd5931bcdc108', // Hardcoded API key
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      
      // Check the response structure
      const { status, data } = response.data;
      if (status !== 'OK') {
        return res.status(500).json({ error: 'Failed to fetch products', details: 'API status not OK' });
      }

      // Extract products
      const products = data.products || [];
      console.log('Products:', products); // Log products for debugging

      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
  } catch (error) {
    console.error('Error searching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

module.exports = {
  searchProducts
};
