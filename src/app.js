// src/app.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trade = require('./models/Trade'); // Importing the Trade model
const tradeRoutes = require('./routes/tradeRoutes'); // Importing trade routes
const balanceRoutes = require('./routes/balanceRoutes'); // Importing balance routes


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connection to MongoDB

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/trades', tradeRoutes); // Using the trade routes

app.use('/api', balanceRoutes); // Using the balance routes

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

