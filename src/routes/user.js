const userCtrl =  require("../controller/user");
const { Fail } = require("../models/Response");


const loginRoute = async (req,res) => {

  const { pathname, method,params } = req;
  
  if (method === "GET" && pathname === "/api/login") {

    const { username,password } = params;

    const result = await userCtrl.login(username,password);

    if(result instanceof Fail){
        return result;
    }
    
    const { data,user_key } = result;

    res.setHeader("Set-Cookie",`user_key=${user_key}; path=/;`)    

    return data;

  }else if(method === "GET" && pathname === "/api/register"){

    const { username,password } = params;

    return userCtrl.register(username,password);

  }

  return null;

}


module.exports = loginRoute;