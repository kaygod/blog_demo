const { execute } = require("../util/_mysql");

/**
 * 判断用户是否存在
 */
exports.userIsExist = async (user_name,password = null)=>{

    let sql = `select user_id,user_name,password from user where user_name=?`;

    let params = [user_name];

    if(password){
        sql += ` and password=?`;
        params.push(password);
    }
    
    const rows = await execute(sql,params);
    
    if(rows.length > 0){
        return rows;
    }else{
        return false;
    }

}

/**
 * 新增用户
 * @param {*} user_name 
 * @param {*} password 
 */
exports.addUser = async (user_name,password)=>{
    
    let sql = `INSERT INTO user(user_id,user_name,password) values(null,?,?)`;

    let params = [user_name,password];
    
    const result = await execute(sql,params);
    
    if(result.affectedRows > 0){
        return {user_id:result.insert_id};
    }else{
        return false;
    }
    
}

/**
 * 查询用户信息
 */
exports.getUserInfo = async (user_id)=>{

    let array = user_id;

    if(!Array.isArray(user_id)){
        array = [user_id];
    }

    let params = `(${array.join(",")})`;

    let sql = `select * from user where user_id in ${params}`;

    const result = await execute(sql,[]);

    return result;
    
}