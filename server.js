require('dotenv').config({ path: './cloudshare.env' });
const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', uploadRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
