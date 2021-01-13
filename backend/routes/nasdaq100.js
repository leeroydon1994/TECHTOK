const express = require("express");

const faveController = require("../controllers/fave");

const router = express.Router();

router.get("/api/stock/", faveController.getFave);
router.post("/api/stock/", faveController.postFave);
router.delete("/api/stock/:symbol", faveController.deleteFave);

module.exports = router;
