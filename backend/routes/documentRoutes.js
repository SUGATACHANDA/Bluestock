const express = require("express")
const multer = require("multer")
const { uploadDocuments } = require("../controllers/documentController")

const upload = multer()
const router = express.Router()


router.post("/upload", upload.fields([{ name: "rhp_pdf", maxCount: 1 }, { name: "drhp_pdf", maxCount: 1 }]), uploadDocuments)

module.exports = router