const express = require("express");

const favoriteController = require("../controllers/fave");

const router = express.Router();

router.get("/api/favourite/stock", favoriteController.getFave);
router.delete("/api/favourite/stock/:symbol", favoriteController.deleteFave);

module.exports = router;
