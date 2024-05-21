const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path")
const protoPath = path.join(__dirname,"..","..","protos","prodduct.proto")
const { listProduct, createProduct, getProduct, deleteProduct, updateProduct } = require("./functions/product.grpc")
const productProto = protoLoader.loadSync(protoPath,{})
const {productPackage} = grpc.loadPackageDefinition(productProto)
const { mongodbConnect } = require("./config/mongoDB.config")
function main(){
    mongodbConnect()
    const server = new grpc.Server()
    server.addService(productPackage.ProductService.service,{
        listProduct,
        createProduct,
        getProduct,
        deleteProduct,
        updateProduct
    })
    
    server.bindAsync("0.0.0.0:4000",grpc.ServerCredentials.createInsecure(),(err, port)=>{
        if(err) return console.log(err.message);
        console.log(`gRPC Running on 0.0.0.0:${port}`);
    })

}
main()