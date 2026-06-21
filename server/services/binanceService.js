const axios = require("axios");

const getLivePrice = async (symbol) => {
  try {
    // Remove extra spaces and convert to uppercase
    symbol = symbol.trim().toUpperCase();

    console.log("Fetching price for:", symbol);

    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    return parseFloat(response.data.price);
  } catch (error) {
    console.error(
      "Binance API Error:",
      error.response?.data || error.message
    );

    throw new Error("Unable to fetch live price from Binance");
  }
};

module.exports = {
  getLivePrice,
};