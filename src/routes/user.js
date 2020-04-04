const userCtrl =  require("../controller/user");

const loginRoute = (req,res) => {

  const { pathname, method,params } = req;
  
  if (method === "GET" && pathname === "/api/login") {

    const { username,password } = params;

    const { data,user_key } = userCtrl.login(username,password);

    res.setHeader("Set-Cookie",`user_key=${user_key}; path=/;`)    

    return data;

  }

  return null;

}


module.exports = loginRoute;