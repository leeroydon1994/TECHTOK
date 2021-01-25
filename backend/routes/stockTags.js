const express = require("express");

const tagController = require("../controllers/stockTags");

const router = express.Router();

router.put("/api/tags/stock/:symbol", tagController.putTag);
router.delete("/api/tags/stock/:symbol", tagController.deleteTag);

module.exports = router;
