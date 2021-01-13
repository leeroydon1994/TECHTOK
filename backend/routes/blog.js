const express = require("express");

const blogController = require("../controllers/blog");

const router = express.Router();

router.delete("/api/blog/:id", blogController.deleteBlog);

router.get("/api/blog", blogController.getBlogList);

router.post("/api/blog", blogController.postAddBlog);

module.exports = router;
