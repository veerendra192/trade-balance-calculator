// src/controllers/balanceController.js

const Trade = require('../models/Trade');

// Function to calculate balance
const calculateBalance = async (req, res) => {
  try {
    const { timestamp } = req.body;
    const date = new Date(timestamp);

    // Finding all trades before the given timestamp
    const trades = await Trade.find({ utc_time: { $lt: date } });

    const balances = {};

    // Calculating the balance for each asset
    trades.forEach((trade) => {
      const { base_coin, operation, amount } = trade;

      if (!balances[base_coin]) {
        balances[base_coin] = 0;
      }

      if (operation === 'BUY') {
        balances[base_coin] += amount;
      } else if (operation === 'SELL') {
        balances[base_coin] -= amount;
      }
    });

    res.json(balances);
  } catch (error) {
    res.status(500).send('An error occurred while calc the balance.');
  }
};

module.exports = { calculateBalance };
