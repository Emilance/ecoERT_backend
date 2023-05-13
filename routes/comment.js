const express = require("express")
const { createComment, getAllReportComments, deleteCommentById } = require("../controllers/comment")

const router = express.Router()

router.post("/:repId", createComment)
router.get("/:repId", getAllReportComments)
router.delete("/:commentId", deleteCommentById)





module.exports= {router}