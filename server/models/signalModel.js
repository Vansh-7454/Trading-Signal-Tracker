const db = require("../config/db");

const createSignal = (signalData, callback) => {
  const query = `
    INSERT INTO signals
    (symbol, direction, entry_price, stop_loss, target_price, entry_time, expiry_time)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      signalData.symbol,
      signalData.direction,
      signalData.entry_price,
      signalData.stop_loss,
      signalData.target_price,
      signalData.entry_time,
      signalData.expiry_time,
    ],
    callback
  );
};

// GET ALL SIGNALS
const getAllSignals = (callback) => {
  const query = "SELECT * FROM signals ORDER BY created_at DESC";

  db.query(query, callback);
};
const getSignalById = (id, callback) => {
  const query = "SELECT * FROM signals WHERE id = ?";

  db.query(query, [id], callback);
};
const deleteSignal = (id, callback) => {
  const query = "DELETE FROM signals WHERE id = ?";

  db.query(query, [id], callback);
};

// EXPORT
module.exports = {
  createSignal,
  getAllSignals,
  getSignalById,
  deleteSignal,
};