const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();


router.post("/api/signup", authController.postSignUp);

router.post("/api/login/facebook", authController.postFBLogin);

router.post("/api/login", authController.postLogin);

module.exports = router;