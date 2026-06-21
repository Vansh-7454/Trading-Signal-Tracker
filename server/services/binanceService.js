const axios = require("axios");

const getLivePrice = async (symbol) => {
  try {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

    const response = await axios.get(url);

    return parseFloat(response.data.price);
  } catch (error) {
    console.error("Binance API Error:", error.message);

    throw new Error("Unable to fetch live price from Binance");
  }
};

module.exports = {
  getLivePrice,
};