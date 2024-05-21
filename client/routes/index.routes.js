const { BlogRoutes } = require("./blog.routes")
const { ProductRoutes } = require("./product.routes")

const router = require("express").Router()


router.use("/product",ProductRoutes)
router.use("/blog",BlogRoutes)

module.exports = {
    allRoutes: router
}