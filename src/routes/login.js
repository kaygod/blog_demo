const { Success } = require("../models/Response");

const loginRoute = (req) => {

  const { url, method } = req;

  if (method === "GET" && url === "/api/login") {

    return new Success({
      user_name: "kay",
      password: "123"
    });

  }


  return null;

}


module.exports = loginRoute;