const {createPool} =require('mysql');
const pool=createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    connectionLimit:10
})

pool.getConnection((err, connection) => {
    if(err){
        console.log("error during connecting to database")
    }
    return connection;
})
const runQuery=function(query,paramsArray){
    return new Promise((resolve, reject) =>{
        pool.query(query,paramsArray,(err,row) =>{
            if(err){
                reject(err)
            }
            resolve(row)
        })
    })
}
module.exports={runQuery}