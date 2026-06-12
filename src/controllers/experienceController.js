const prisma = require("../config/prisma");

const createExperience = async (req, res) => {
  try {
    const {
      company_id,
      user_id,
      title,
      result,
      interview_mode,
      overall_experience,
      general_advice,
    } = req.body;

    const experience = await prisma.experience.create({
      data: {
        company_id,
        user_id,
        title,
        result,
        interview_mode,
        overall_experience,
        general_advice,
      },
    });

    res.status(201).json(experience);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      include: {
        company: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getExperiencesByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const experiences = await prisma.experience.findMany({
      where: {
        company_id: Number(companyId),
      },
    });

    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createExperience,
  getAllExperiences,
  getExperiencesByCompany,
};
