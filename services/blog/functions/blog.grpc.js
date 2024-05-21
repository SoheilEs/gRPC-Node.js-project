const { BlogModel } = require("../models/blog.model");

async function listBlog(_, callback) {
  try {
    const blogs = await BlogModel.find({});
    callback(null, { blogs });
  } catch (error) {
    callback(error, null);
  }
}
async function createBlog(call, callback) {
  try {
    const result = await BlogModel.create(call.request);
    if (!result) throw new Error("Blog doesnt created");
    callback(null, { status: "Blog successfully created" });
  } catch (error) {
    callback(error, null);
  }
}
async function getBlog(call, callback) {
  try {
    const { id } = call.request;
    const result = await BlogModel.findOne({ id });
    if (!result) throw new Error("Blog dosent exist");
    callback(null, result);
  } catch (error) {
    callback(error, null);
  }
}
async function updateBlog(call, callback) {
  try {
    const data = call.request;
    if(!data.id) throw new Error("id of blog required")
    const updateResult = await BlogModel.updateOne(
      { id: data.id },
      {
        $set: data,
      }
    );
    if (updateResult.modifiedCount === 0) throw new Error("update unsuccessfull")
    callback(null, { status: "Product successfully updated" });
  } catch (error) {
    callback(error, null);
  }
}
async function deleteBlog(call, callback) {
  try {
    const { id } = call.request;
    const deleteResult = await BlogModel.deleteOne({ id: id });
    if (!deleteResult.deletedCount) throw new Error("Delete was unsuccessfull");
    callback(null, { status: "Blog successfully deleted" });
  } catch (error) {
    callback(error, null);
  }
}

module.exports = {
  listBlog,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
