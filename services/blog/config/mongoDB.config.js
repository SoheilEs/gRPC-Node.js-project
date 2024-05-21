const { default: mongoose } = require("mongoose");


async function mongodbConnect(){
    try{
        if(mongoose.connections[0].readyState) return console.log("DB already Connected...")
        await mongoose.connect("mongodb://localhost:27017/gRPC")
        process.on("SIGINT",async()=>{
            console.log("\n db disconnected...");
            await mongoose.connection.close()
            process.exit(0)
       })
        console.log("connected to MongoDB......");
    }catch(error){
        console.log(error?.message ?? "Failed DB Connection...");
    }
}

module.exports = {
    mongodbConnect
}