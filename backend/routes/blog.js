const express = require("express");

const blogController = require("../controllers/blog");

const router = express.Router();

router.get("/api/blog", blogController.getBlogList);
router.post("/api/blog", blogController.postAddBlog);
router.put("/api/blog/:id", blogController.putEditBlog);
router.delete("/api/blog/:id", blogController.deleteBlog);

module.exports = router;
