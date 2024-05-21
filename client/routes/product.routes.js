const { listProduct, createProduct, deleteProduct, updateProduct, getProduct } = require("../controllers/product.controller")

const router = require("express").Router()

router.get("/list",listProduct)
router.post("/create",createProduct)
router.delete("/delete/:id",deleteProduct)
router.patch("/update",updateProduct)
router.get("/:id",getProduct)
module.exports = {
    ProductRoutes: router
}
