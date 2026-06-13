const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createQuestion,
  getAllQuestions,
  getQuestionsByRound,
} = require("../controllers/questionController");

router.post("/", authMiddleware, createQuestion);

router.get("/", getAllQuestions);

router.get("/round/:roundId", getQuestionsByRound);

module.exports = router;
