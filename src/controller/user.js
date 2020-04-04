const { Success } = require("../models/Response");
const {md5} = require("../util/utils");
const { set } = require("../util/_redis");

exports.login = (username,password)=>{

    const data = {username,password};

    const user_key = md5(JSON.stringify(data));

    set(user_key,data);
  
    return {
        data:new Success(data),
        user_key
    };

}