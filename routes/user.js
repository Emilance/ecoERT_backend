const express = require("express")
const { signUp, login, getAllUsers, deleteUser, uploadUserDisplayPicture } = require("../controllers/user")
const { verifyToken } = require("../Middleware/auth")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/", getAllUsers)
router.post("/uploaddp",verifyToken,upload.single('media'), uploadUserDisplayPicture)
router.delete("/:userId", deleteUser)



module.exports= {router}