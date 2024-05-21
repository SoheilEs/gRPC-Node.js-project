const { listBlog, createBlog, deleteBlog, updateBlog, getBlog } = require("../controllers/blog.controller")

const router = require("express").Router()

router.get("/list",listBlog)
router.post("/create",createBlog)
router.delete("/delete/:id",deleteBlog)
router.patch("/update",updateBlog)
router.get("/:id",getBlog)
module.exports = {
    BlogRoutes: router
}