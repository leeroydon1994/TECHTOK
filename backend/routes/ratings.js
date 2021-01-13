const express = require("express");

const ratingsController = require("../controllers/ratings");
const favoriteController = require("../controllers/fave");

const router = express.Router();

router.get("/api/ratings/stock", ratingsController.getRatings);

// All the fave list requests are ahndled by fave.js
router.get("/api/favourite/stock", favoriteController.getFave);
router.post("/api/favourite/stock", favoriteController.postFave);
router.delete("/api/favourite/stock/:symbol", favoriteController.deleteFave);

module.exports = router;
