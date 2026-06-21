const { getLivePrice } = require("../services/binanceService");
const db = require("../config/db");

const signalModel = require("../models/signalModel");

const createSignal = (req, res) => {
  const {
    symbol,
    direction,
    entry_price,
    stop_loss,
    target_price,
    entry_time,
    expiry_time,
  } = req.body;

  // Required fields
  if (
    !symbol ||
    !direction ||
    !entry_price ||
    !stop_loss ||
    !target_price ||
    !entry_time ||
    !expiry_time
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const entry = Number(entry_price);
const stop = Number(stop_loss);
const target = Number(target_price);

// BUY Validation
if (direction === "BUY") {
  if (stop >= entry) {
    return res.status(400).json({
      message: "BUY: Stop Loss must be less than Entry Price",
    });
  }

  if (target <= entry) {
    return res.status(400).json({
      message: "BUY: Target Price must be greater than Entry Price",
    });
  }
}

  // SELL Validation
if (direction === "SELL") {
  if (stop <= entry) {
    return res.status(400).json({
      message: "SELL: Stop Loss must be greater than Entry Price",
    });
  }

  if (target >= entry) {
    return res.status(400).json({
      message: "SELL: Target Price must be less than Entry Price",
    });
  }
}

  // Entry Time Validation
const now = new Date();

if (new Date(entry_time) < now) {
  return res.status(400).json({
    message: "Entry Time cannot be in the past",
  });
}

  // Expiry Validation
  if (new Date(expiry_time) <= new Date(entry_time)) {
    return res.status(400).json({
      message: "Expiry Time must be after Entry Time",
    });
  }

  signalModel.createSignal(req.body, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Signal Created Successfully",
      id: result.insertId,
    });
  });
};
const getAllSignals = (req, res) => {
  signalModel.getAllSignals((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(results);
  });
};
const getSignalById = (req, res) => {
  const { id } = req.params;

  signalModel.getSignalById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Signal not found",
      });
    }

    res.status(200).json(results[0]);
    // If already expired, don't change it again
if (signal.status === "EXPIRED") {
  return res.json(signal);
}

// If expiry time has passed, mark as expired permanently
if (new Date() > new Date(signal.expiry_time)) {
  db.query(
    "UPDATE signals SET status = ? WHERE id = ?",
    ["EXPIRED", id],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Database Error",
        });
      }

      signal.status = "EXPIRED";
      return res.json(signal);
    }
  );

  return;
}
  });
};
const deleteSignal = (req, res) => {
  const { id } = req.params;

  signalModel.deleteSignal(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Signal not found",
      });
    }

    res.status(200).json({
      message: "Signal deleted successfully",
    });
  });
};
const getSignalStatus = async (req, res) => {
  const { id } = req.params;

  signalModel.getSignalById(id, async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Signal not found" });
    }

    const signal = results[0];

    // Already expired
    if (signal.status === "EXPIRED") {
      return res.json(signal);
    }

    // Expiry check
    if (new Date() > new Date(signal.expiry_time)) {
      db.query(
        "UPDATE signals SET status = ? WHERE id = ?",
        ["EXPIRED", id],
        (err) => {
          if (err) {
            return res.status(500).json({
              message: "Database Error",
            });
          }

          signal.status = "EXPIRED";
          return res.json(signal);
        }
      );

      return;
    }

    try {
      const currentPrice = await getLivePrice(signal.symbol);

      let status = signal.status;
      let roi = 0;

      if (signal.direction === "BUY") {
        if (currentPrice >= signal.target_price) {
          status = "TARGET_HIT";
        } else if (currentPrice <= signal.stop_loss) {
          status = "STOPLOSS_HIT";
        }

        roi =
          ((currentPrice - signal.entry_price) / signal.entry_price) * 100;
      }

      if (signal.direction === "SELL") {
        if (currentPrice <= signal.target_price) {
          status = "TARGET_HIT";
        } else if (currentPrice >= signal.stop_loss) {
          status = "STOPLOSS_HIT";
        }

        roi =
          ((signal.entry_price - currentPrice) / signal.entry_price) * 100;
      }

      db.query(
        "UPDATE signals SET status=?, realized_roi=? WHERE id=?",
        [status, roi.toFixed(2), id]
      );

      res.json({
        ...signal,
        current_price: currentPrice,
        status,
        realized_roi: Number(roi.toFixed(2)),
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });
};
   
module.exports = {
  createSignal,
  getAllSignals,
  getSignalById,
  deleteSignal,
  getSignalStatus,
};