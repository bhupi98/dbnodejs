const express=require('express');
const router=express.Router();
const {runQuery} = require('./config/db')

router.get("/getusers", async (req,res)=>{
    const executeQuery = await runQuery(`select * from user`,[])
    res.json(executeQuery)
})
module.exports=router