const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const productProtoPath = path.join(
  __dirname,
  "..",
  "..",
  "protos",
  "prodduct.proto"
);
const productProto = protoLoader.loadSync(productProtoPath, {});
const { productPackage } = grpc.loadPackageDefinition(productProto);

const productClient = new productPackage.ProductService(
  "0.0.0.0:4000",
  grpc.credentials.createInsecure()
);

function listProduct(req, res, next) {
  productClient.listProduct(null, (err, data) => {
    if (err) return res.json({message:err.details});
    return res.status(200).json(data);
  });
}
function createProduct(req, res, next) {
    const{title,price} = req.body
    productClient.createProduct({title,price},(err,data)=>{
        if(err) return res.json({message:err.details})
        return res.status(201).json(data)
    })
}
function getProduct(req, res, next) {
  const {id} = req.params
  productClient.getProduct({id},(err,data)=>{
    if(err) return res.json({message:err.details})
      return res.status(200).json(data)
  })
}
function updateProduct(req, res, next) {
  const {id,price,title} = req.body
  
  productClient.updateProduct({id,price,title},(err,result)=>{
  if(err) return res.json({message:err.details})
  return res.status(201).json(result)
  })

}
function deleteProduct(req, res, next) {
  const {id} = req.params
  productClient.deleteProduct({id},(err,data)=>{
    if(err) return res.json({message:err.details})
      return res.status(200).json(data)
  })
}

module.exports = {
  listProduct,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
