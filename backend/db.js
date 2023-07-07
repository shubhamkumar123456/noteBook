const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const mongoUri ="mongodb://0.0.0.0:27017/Notebook"
const connectToMongo= ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connected to mongoose successfully")
    })
}
module.exports= connectToMongo;