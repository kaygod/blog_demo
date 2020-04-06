const mysql = require('mysql2');
const { mysqlConfig:{ host,user,database,password,port } } = require("../config/config");

const pool = mysql.createPool({
    host,
    user,
    database,
    password,
    port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  const promisePool = pool.promise();

  exports.execute = (sql,params)=>{
    return promisePool.execute(sql,params).then((data)=>{

      return data[0];

    });
    
  }
  
  exports.query = (sql)=>{
     return promisePool.query(sql);
  } 

  exports.escape = mysql.escape;