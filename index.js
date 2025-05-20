const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML page
app.get('/ip', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to return user's IP
app.get('/get-ip', async (req, res) => {
    try {
      const ip = await axios.get('https://api.ipify.org?format=json');
      res.send(`Your public IP is: ${ip.data.ip}`);
    } catch (error) {
      console.error('Error fetching IP:', error);
      res.status(500).send('Error fetching IP');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
