const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const {salt} =  require("../config/config");
const { get } = require("../util/_redis");
const urlHandler = require("url");
const { Fail } = require("../models/Response");
const moment = require('moment');

exports.parseUrl = (req,res)=>{

   const { url,method } = req;

   if(method === "GET" && (!url.includes("/api"))){ //请求静态资源的

       res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});//只需要设置响应头的编码格式就好    

      return new Promise((resolve,reject)=>{

        let pagePath;

        if(url === "/"){
          pagePath =  path.join(__dirname,`../pages/index.html`);
        }else if(url.includes("/blog/detail/")){
          pagePath =  path.join(__dirname,`../pages/blog_detail.html`);          
        }
        else{
          pagePath = path.join(__dirname,`../pages/${url.slice(1)}.html`)
        }

        const readStream = fs.createReadStream(pagePath);

        readStream.pipe(res);
        
        readStream.on('error', (err) => {
           reject(err)
        });
    
        readStream.on('end', () => {
           resolve(true);
        });

      })

   }

   return Promise.resolve(null);

}

/**
 * md5加密
 * @param {数据} data 
 */
exports.md5 = (data)=>{

  const md5Handler = crypto.createHmac("md5",salt).update(data);
  
  return md5Handler.digest("hex");

}

exports.sessionHanlder = (req)=>{
   
    return new Promise((resolve)=>{

      const cookieStr = req.headers.cookie;

      if(!cookieStr){
        resolve(null);
        return false;
      }

      const array = cookieStr.split(";");

      const item = array.find((item)=>{
        return item.includes("user_key=");
      })
      
      if(item){

        const user_key = item.split("=")[1];

        if(user_key){

          get(user_key).then((value)=>{
            req.session = value;
            resolve(null);
          })

        }else{
          resolve(null);
        }

      }else{
        resolve(null);
      }
     
    })

}

/**
 * 可以登录返回 true
 * 不能登录返回 false
 * @param {*} req 
 * @param {*} res 
 */
exports.loginInterceptor = (req,res)=>{

  const { url,method,session } = req;  

  const whiteList = ["/api/login","/login","/api/register"];

  const pathname = urlHandler.parse(url).pathname;

  if((whiteList.includes(pathname) || !pathname.includes("/api/")) && method === "GET"){ //放行
    return true;
  }else{

     if(session){ //说明登录过了
      return true;
     }else{
      res.json(new Fail(200, "you havn't login!")); 
      return false;
     }

  }
}

exports.delProp = (data,property = null)=>{

  try {
    
   if(property === null){
      return false;
   }

   let array = property;

   if(!Array.isArray(property)){
    array = [property];
   }

   array.forEach((item)=>{
      delete data[item];
   })

  } catch (error) {
      console.log(error);
  }

}


exports.getDate = (date)=>{
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
}