const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { Fail } = require("./models/Response");
const { parseUrl,sessionHanlder,loginInterceptor } = require("./util/utils");
const urlHandler = require("url");
const querystring = require("querystring");
require("./util/_redis");
require("./util/_mysql");
const { logger } = require("./util/logger");

const app = async (req, res) => {

  res.json = function (data) {
    res.end(JSON.stringify(data));
  }

  await sessionHanlder(req);//处理session

  if(!loginInterceptor(req,res)){ //登录拦截器
    return false;
  }
 
  try {
    const feedback = await parseUrl(req,res);
    if(feedback){
      return false;
    }
  } catch (error) {
    res.json(new Fail(1, "page not found 404"));
    return false;     
  }

  res.setHeader('Content-Type','application/json; charset=utf-8');

  initialParams(req);

  const result = await routeHandler(req,res);

  if (result) {
    logger(req,result);
    return false;
  }

  res.json(new Fail(1, "page not found 404"));

}

const routeHandler = async (req,res)=>{

  const array = [userRoute,blogRoute];

  for(let fn of array){
    const result  = fn(req,res)
    if(result){

      if(result instanceof Promise){
        let data;
        try {
          data = await result;
        } catch (error) {
          console.log(error);
        }
  
        if(data){
          res.json(data);
          return data;
        }

       }else{
        res.json(result);
        return result;    
       }
      
    }
  }

  return false;

}

const initialParams = (req)=>{

  const { url } = req;  

  const { query,pathname } = urlHandler.parse(url);
  
  const result = querystring.parse(query);

  req.pathname = pathname;

  req.params = result;

}

module.exports = app;