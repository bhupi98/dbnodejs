const express=require('express');
const bcrypt=require('bcryptjs')
const {validationResult, body}=require('express-validator')
const router=express.Router();
const {runQuery} = require('../config/db')
//get all the users
router.get("/getusers", async (req,res,next)=>{
    try{
        const executeQuery = await runQuery(`select * from user`,[])
        res.status(200).json({message:'All ussers',
    data: executeQuery})
    }
    catch(err){
        console.log(err)
        next(err)
    }
   
})
//get user by id
router.get("/getusers/:id", async (req, res,next)=>{
    try{
        const executeQuery = await runQuery(`select * from user where id =${req.params.id}`);
        res.status(200).json({message:'getuserbyid',
    data: executeQuery})
    }catch(err){
        console.log(err)
        next(err)
    }
  
})
//add user
router.post("/adduser",body('username').isEmail(),
body('password').isLength({min:4}).withMessage('password must be at least 4 characters'), async (req, res,next)=>{
  try{
      console.log("is somethhing coming here")
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    const hashPass= await bcrypt.hash(req.body.password,10)
    const query=`insert into user(id,username,password) values(?,?,?)`
    const paramsArray=[req.body.id, req.body.username, hashPass]
    const executeQuery= await runQuery(query,paramsArray)
    res.status(201).json({message:"user added successfully",data:executeQuery})
  }catch(err){
      console.error(err)
      next(err)
  }
})
//update user by id
router.patch("/updateuser",async (req, res,next)=>{
 try{
    const hashPass=await bcrypt.hash(req.body.password,10)
    const query=`update user set username=?, password=? where id=?`
    const paramsArray= [req.body.username, hashPass,req.body.id]
    const executeQuery= await runQuery(query,paramsArray)
    res.status(200).json({message:'user updated successfully',data:executeQuery})
 }catch(err){
     console.error(err)
     next(err)
 }
})
//delete user by id
router.delete("/deleteuser/:id", async (req,res,next) => {
    try {
        const executeQuery= await runQuery(`delete from user where id=${req.params.id}`,[])
        res.status(400).json({
            message:'user has been deleted successfully',data:executeQuery
        })

    }catch(err){
        console.error(err)
        next(err)
    }
})
module.exports=router