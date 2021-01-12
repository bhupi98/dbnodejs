require('dotenv').config()
const {runQuery}=require('./config/db')
const express=require('express');
const user=require('./routes/router')
const app = express();
app.use("/api",user)
app.listen(process.env.SERVER_PORT,()=>console.log('listening on port'+process.env.SERVER_PORT))