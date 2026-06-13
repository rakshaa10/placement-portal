const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRound,
  getAllRounds,
  getRoundsByExperience,
} = require("../controllers/roundController");

router.post("/", authMiddleware, createRound);

router.get("/", getAllRounds);

router.get("/experience/:experienceId", getRoundsByExperience);

module.exports = router;
