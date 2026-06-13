const prisma = require("../config/prisma");

const getAllCompanies = async (req, res) => {
  try {
    const { search } = req.query;

    const companies = await prisma.company.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                role: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const {
      name,
      role,
      employment_type,
      eligibility,
      cgpa_cutoff,
      company_description,
    } = req.body;

    const company = await prisma.company.create({
      data: {
        name,
        role,
        employment_type,
        eligibility,
        cgpa_cutoff,
        company_description,
      },
    });

    res.status(201).json(company);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });

    res.status(200).json(company);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    await prisma.company.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const getCompanyFullDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        role: true,
        employment_type: true,
        eligibility: true,
        cgpa_cutoff: true,
        company_description: true,

        experiences: {
          select: {
            id: true,
            title: true,
            result: true,
            interview_mode: true,
            overall_experience: true,
            general_advice: true,

            rounds: {
              select: {
                id: true,
                round_number: true,
                round_type: true,
                duration: true,
                overview: true,

                questions: {
                  select: {
                    id: true,
                    question_text: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  getCompanyFullDetails,
  updateCompany,
  deleteCompany,
};