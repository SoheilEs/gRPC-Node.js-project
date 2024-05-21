const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path")
const protoPath = path.join(__dirname,"..","..","protos","blog.proto")
const { listBlog, createBlog, getBlog, deleteBlog, updateBlog } = require("./functions/blog.grpc")
const blogProto = protoLoader.loadSync(protoPath,{})
const {blogPackage} = grpc.loadPackageDefinition(blogProto)
const { mongodbConnect } = require("./config/mongoDB.config")
function main(){
    mongodbConnect()
    const server = new grpc.Server()
    server.addService(blogPackage.BlogService.service,{
        listBlog,
        createBlog,
        getBlog,
        deleteBlog,
        updateBlog
    })
    
    server.bindAsync("0.0.0.0:4000",grpc.ServerCredentials.createInsecure(),(err, port)=>{
        if(err) return console.log(err.message);
        console.log(`gRPC Running on 0.0.0.0:${port}`);
    })

}
main()