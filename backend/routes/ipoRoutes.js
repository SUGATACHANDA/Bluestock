const express = require("express");
const multer = require("multer");
const ipoController = require("../controllers/ipoController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/",
    upload.fields([
        { name: "rhp_pdf", maxCount: 1 },
        { name: "drhp_pdf", maxCount: 1 },
    ]),
    ipoController.createIPO
);

router.get("/", ipoController.getAllIPOs);
router.get("/:id", ipoController.getIPOById);
router.put("/:id", upload.fields([{ name: "rhp_pdf", maxCount: 1 }, { name: "drhp_pdf", maxCount: 1 }]), ipoController.updateIPO);
router.delete("/:id", ipoController.deleteIPO);

module.exports = router;
