const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const blogProtoPath = path.join(
  __dirname,
  "..",
  "..",
  "protos",
  "blog.proto"
);
const blogProto = protoLoader.loadSync(blogProtoPath, {});
const { blogPackage } = grpc.loadPackageDefinition(blogProto);

const blogClient = new blogPackage.BlogService(
  "0.0.0.0:4002",
  grpc.credentials.createInsecure()
);

function listBlog(req, res, next) {
  blogClient.listBlog(null, (err, data) => {
    if (err) return res.json({message:err.details});
    return res.status(200).json(data);
  });
}
function createBlog(req, res, next) {
    const{title,text} = req.body
    blogClient.createBlog({title,text},(err,data)=>{
        if(err) return res.json({message:err.details})
        return res.status(201).json(data)
    })
}
function getBlog(req, res, next) {
  const {id} = req.params
  blogClient.getBlog({id},(err,data)=>{
    if(err) return res.json({message:err.details})
      return res.status(200).json(data)
  })
}
function updateBlog(req, res, next) {
  const {id,title,text} = req.body
  
  blogClient.updateBlog({id,title,text},(err,result)=>{
  if(err) return res.json({message:err.details})
  return res.status(201).json(result)
  })

}
function deleteBlog(req, res, next) {
  const {id} = req.params
  blogClient.deleteBlog({id},(err,data)=>{
    if(err) return res.json({message:err.details})
      return res.status(200).json(data)
  })
}

module.exports = {
  listBlog,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
