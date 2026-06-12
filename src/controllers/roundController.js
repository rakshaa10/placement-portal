const prisma = require("../config/prisma");

const createRound = async (req, res) => {
  try {
    const { experience_id, round_number, round_type, duration, overview } =
      req.body;

    const round = await prisma.round.create({
      data: {
        experience_id,
        round_number,
        round_type,
        duration,
        overview,
      },
    });

    res.status(201).json(round);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllRounds = async (req, res) => {
  try {
    const rounds = await prisma.round.findMany();

    res.status(200).json(rounds);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getRoundsByExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;

    const rounds = await prisma.round.findMany({
      where: {
        experience_id: Number(experienceId),
      },
    });

    res.status(200).json(rounds);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createRound,
  getAllRounds,
  getRoundsByExperience,
};
