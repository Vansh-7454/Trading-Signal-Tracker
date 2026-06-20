const axios = require("axios");

const getLivePrice = async (symbol) => {
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  const response = await axios.get(url);

  return parseFloat(response.data.price);
};

module.exports = {
  getLivePrice,
};