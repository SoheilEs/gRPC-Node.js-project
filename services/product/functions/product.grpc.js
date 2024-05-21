const { ProductModel } = require("../model/product.model");

async function listProduct(call, callback) {
  try {
    const products = await ProductModel.find({});
    callback(null, { products });
  } catch (error) {
    callback(error, null);
  }
}
async function createProduct(call, callback) {
  try {
    const result = await ProductModel.create(call.request);
    if (!result) throw new Error("Product doesnt created");
    callback(null, { status: "Product successfully created" });
  } catch (error) {
    callback(error, null);
  }
}
async function getProduct(call, callback) {
  try {
    const { id } = call.request;
    const result = await ProductModel.findOne({ id });
    if (!result) throw new Error("Product dosent exist");
    callback(null, result);
  } catch (error) {
    callback(error, null);
  }
}
async function updateProduct(call, callback) {
  try {
    const data = call.request;
    const updateResult = await ProductModel.updateOne(
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
async function deleteProduct(call, callback) {
  try {
    const { id } = call.request;
    const deleteResult = await ProductModel.deleteOne({ id: id });
    if (!deleteResult.deletedCount) throw new Error("Delete was unsuccessfull");
    callback(null, { status: "Item successfully deleted" });
  } catch (error) {
    callback(error, null);
  }
}

module.exports = {
  listProduct,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
