
const express = require("express");
const router = express.Router();

const signalController = require("../controllers/signalController");

router.post("/", signalController.createSignal);
router.get("/", signalController.getAllSignals);
router.get("/:id", signalController.getSignalById);
router.delete("/:id", signalController.deleteSignal);
router.get("/:id/status", signalController.getSignalStatus);

module.exports = router;