const express = require("express");
const router = express.Router();
const { handleSignin, handleLogin, handleRecieverdata } = require('../controllers/userroutes');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/signin', upload.single('pic'), handleSignin);
router.post('/login', handleLogin);
router.post('/leftpane', handleRecieverdata);

module.exports = router;
