const express = require("express")
const multer = require("multer")
const upload = multer()

const { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateComapany } = require("../controllers/companyController")

const router = express.Router()

router.post("/", upload.single("company_logo"), createCompany)
router.get("/", getAllCompanies)
router.get("/:id", getCompanyById)
router.put("/:id", updateComapany)
router.delete("/:id", deleteCompany)

module.exports = router