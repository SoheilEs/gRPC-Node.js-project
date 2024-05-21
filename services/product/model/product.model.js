const { default: mongoose, models, model } = require("mongoose")


const productSchema = new mongoose.Schema({
    id:{type:Number},
    title:{type: String, required: true},
    price:{type: String, required: true},
},{versionKey:false})

productSchema.pre("save",async function(next){
    const self = this
    const count = await self.constructor.countDocuments()
    self.set({"id": count + 1})
    next()
})
const ProductModel =models.Product || model("Product",productSchema)
module.exports = {
    ProductModel
}