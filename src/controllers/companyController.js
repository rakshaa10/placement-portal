const prisma = require("../config/prisma");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();

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

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};