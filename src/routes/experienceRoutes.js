const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createExperience,
  getAllExperiences,
  getExperiencesByCompany,
} = require("../controllers/experienceController");

router.post("/", authMiddleware, createExperience);
router.get("/", getAllExperiences);
router.get("/company/:companyId", getExperiencesByCompany);
module.exports = router;

