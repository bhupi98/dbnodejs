require('dotenv').config()
const express=require('express');
const bodyparser=require('body-parser')
const user=require('./routes/router')
const app = express();
app.use(bodyparser.json())
app.use("/api",user)
app.listen(process.env.SERVER_PORT,()=>console.log('listening on port'+process.env.SERVER_PORT))