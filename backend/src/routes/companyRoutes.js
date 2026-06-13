const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllCompanies,
  createCompany,
  getCompanyFullDetails,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

router.get("/", getAllCompanies);

router.post("/", authMiddleware, createCompany);

router.get("/:id/full", getCompanyFullDetails);

router.get("/:id", getCompanyById);

router.put("/:id", authMiddleware, updateCompany);

router.delete("/:id", authMiddleware, deleteCompany);

module.exports = router;
