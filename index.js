require('dotenv').config()
const express=require('express');
const app = express();
const {runQuery} = require('./db')
app.get("/getusers", async (req,res)=>{
    const executeQuery = await runQuery(`select * from user`,[])
    res.json(executeQuery)
})
app.listen(process.env.SERVER_PORT,()=>console.log('listening on port'+process.env.SERVER_PORT))