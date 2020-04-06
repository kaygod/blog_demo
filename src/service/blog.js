const { execute } = require("../util/_mysql");

const page_size = 10;


exports.addBlog = async (user_id,content,title)=>{

    let sql ="INSERT INTO blog VALUES(null,?,?,?,?)";

    let params = [user_id,title,content,new Date().getTime()];

    const rows = await execute(sql,params);

    if(rows.affectedRows > 0){
        return {blog_id:rows.insert_id};
    }else{
        return false;
    }

}

exports.delBlog = async (user_id,blog_id)=>{

  let sql = "DELETE FROM blog WHERE user_id = ? and blog_id = ?";

  let params = [user_id,blog_id];

  const result = await execute(sql,params);

  if(result.affectedRows>0){
    return true;
  }else{
    return false; 
  }

}

exports.isExit = async (user_id,blog_id) =>{

  let sql = "select count(*) from blog where user_id=? and blog_id=?";

  let params = [user_id,blog_id];

  const rows = await execute(sql,params);

  if(rows[0]["count(*)"] > 0){
    return true;
  }else{
    return false;  
  }

}

exports.getNumbers = async ()=>{

    let sql = "select count(*) from blog";

    const rows = await execute(sql,[]);

    if(rows.length > 0){
        return Math.ceil(rows[0]["count(*)"]/page_size);
    }else{
        return 0;
    }
    
}

exports.getBlog = async (page_no = 1,blog_id = null)=>{


    let sql,params = [];

    if(blog_id){
        sql = "SELECT blog_id,user_id,title,content,time FROM blog where blog_id = ?";
        params.push(blog_id);                
    }else{
        sql = "SELECT blog_id,user_id,title,content,time FROM blog ORDER BY time DESC LIMIT ?,?";
        params.push((page_no-1)*page_size,page_size);        
    }
         
    const rows = await execute(sql,params);
        
    if(rows.length > 0){
         return rows;
    }else{
         return [];
    }

}

exports.updateBlog = async (user_id,blog_id,content)=>{

    let sql = "UPDATE blog SET content = ? where user_id = ? AND blog_id = ?";

    let params = [content,user_id,blog_id];

    const result = await execute(sql,params);
    
    if(result.affectedRows>0){
        return true;
    }else{
        return false; 
    }

}