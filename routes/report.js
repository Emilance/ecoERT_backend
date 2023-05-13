const express = require("express")
const {createReport, getAllReports, getAllMyReports , getReportById, deleteReportById} = require("../controllers/report")
const { verifyToken } = require("../Middleware/auth")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.post("/", verifyToken, upload.single('media'), createReport)
router.get("/", getAllReports)
router.get("/myreports", getAllMyReports)
router.get("/:repId", getReportById)
router.delete("/:repId", deleteReportById)




module.exports= {router}