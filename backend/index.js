const connectToMongo = require("./db")
const express = require('express');
var cors = require('cors')

// var cors = require('cors')
connectToMongo()
const app = express();
app.use(cors());
const port = 3001;
// app.use(cors())
app.use(express.json())

// available routes;
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))
app.listen(port,()=>{
    console.log(`iNotebook server is running at ${port} port`)
})
