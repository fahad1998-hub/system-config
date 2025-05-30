const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

// Configure Morgan logging
app.use(morgan('dev')); // Logs in development format: :method :url :status :response-time ms

// Get the system IP that is running the server
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the main HTML page
app.get("/system-ip", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve the client IP page
app.get("/client-ip", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get the system IP that is running the server
// API endpoint to return user's IP
app.get("/get-ip", async (req, res) => {
  try {
    const ip = await axios.get("https://api.ipify.org?format=json");
    res.send(`Your public system IP is: ${ip.data.ip}`);
  } catch (error) {
    console.error("Error fetching IP:", error);
    res.status(500).send("Error fetching IP");
  }
});

app.get("/get-client-ip", (req, res) => {
  try {
    let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (clientIp === "::1" || clientIp === "::ffff:127.0.0.1") {
        clientIp = "127.0.0.1";
    }
    clientIp = clientIp.replace(/^::ffff:/, ''); 
    res.send(`${clientIp}`);
  } catch (error) {
    console.error("Error fetching IP:", error);
    res.status(500).send("Error fetching IP");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
