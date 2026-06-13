const prisma = require("../config/prisma");

const createQuestion = async (req, res) => {
  try {
    const { round_id, question_text } = req.body;

    const question = await prisma.question.create({
      data: {
        round_id,
        question_text,
      },
    });

    res.status(201).json(question);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getQuestionsByRound = async (req, res) => {
  try {
    const { roundId } = req.params;

    const questions = await prisma.question.findMany({
      where: {
        round_id: Number(roundId),
      },
    });

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionsByRound,
};
