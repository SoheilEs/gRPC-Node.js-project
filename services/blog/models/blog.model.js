const { default: mongoose, models, model } = require("mongoose")


const blogSchema = new mongoose.Schema({
    id:{type:Number},
    title:{type: String, required: true},
    text:{type: String, required: true},
},{versionKey:false})

blogSchema.pre("save",async function(next){
    const self = this
    const count = await self.constructor.countDocuments()
    self.set({"id": count + 1})
    next()
})
const BlogModel = models.Blog || model("Blog",blogSchema)
module.exports = {
    BlogModel
}