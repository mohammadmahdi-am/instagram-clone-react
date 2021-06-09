const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const {MONGO_URI} = require("./config/keys")


 

mongoose.connect(MONGO_URI,{ useNewUrlParser: true ,useUnifiedTopology: true })
 
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo") 
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err) 
})

require('./models/user') 
require('./models/post')
 
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(PORT,()=>{
    console.log('app is running on ',PORT)
})