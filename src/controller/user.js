const { Success,Fail } = require("../models/Response");
const {md5,delProp} = require("../util/utils");
const { set } = require("../util/_redis");
const { userIsExist,addUser } = require("../service/user");

exports.login = async (username,password)=>{

    const user_data = await userIsExist(username,password);
    
    if(!user_data || !Array.isArray(user_data)){
        return new Fail(202,"用户名或者密码错误");
    }

    const user = user_data[0];

    delProp(user,"password");

    const user_key = md5(JSON.stringify(user));

    set(user_key,user);
  
    return {
        data:new Success(user),
        user_key
    };

}

exports.register = async (user_name,password)=>{

    const isExit = await userIsExist(user_name);

    if(isExit){
        return new Fail(201,"用户名已存在!");
    }

   const result = await addUser(user_name,password);

   if(result){
     return new Success(result);
   }else{
     return new Fail(202,"插入失败!");    
   }
        
}