const express = require("express")
const { allRoutes } = require("./routes/index.routes")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(allRoutes)
app.listen("4001",()=>{
    console.log("Client runing on :4001")
})