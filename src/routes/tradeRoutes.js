// src/routes/tradeRoutes.js

const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Trade = require('../models/Trade');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Seting up multer to save uploaded files to the 'uploads/' directory

// Routing to handle CSV upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const trades = [];

  // Parse the CSV file
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      // Extract base_coin and quote_coin from the market
      const [base_coin, quote_coin] = row.Market.split('/');

      // Create a new trade object
      const trade = new Trade({
        utc_time: new Date(row.UTC_Time),
        operation: row.Operation.toUpperCase(),
        market: row.Market,
        base_coin,
        quote_coin,
        amount: parseFloat(row['Buy/Sell Amount']),
        price: parseFloat(row.Price),
      });

      trades.push(trade);
    })
    .on('end', async () => {
      try {
        // Save all trades to the database
        await Trade.insertMany(trades);
        res.status(200).send('File processed and data stored successfully.');
      } catch (err) {
        res.status(500).send('Error storing data in the database.');
      } finally {
        // Delete the file after processing
        fs.unlinkSync(req.file.path);
      }
    });
});

module.exports = router;
