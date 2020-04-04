const blogCtrl =  require("../controller/blog");

const blogRoute = (req) => {

  const { pathname, method,params } = req;
  
  if (method === "GET" && pathname === "/api/add") { ;//新增博客

    const { title,content } = params;

    return blogCtrl.addOne(title,content);

  }else if(method === "GET" && pathname === "/api/get_list"){ //获取博客列表

    const { page_no } = params;

    return blogCtrl.getList(page_no);

  }else if(method === "GET" && pathname === "/api/del"){ //删除博客
    
        const { blog_id } = params;
    
        return blogCtrl.delOne(blog_id);
    
  }else if(method === "GET" && pathname.includes("/api/blog/detail/")){ //进入博客详情
    
        const blog_id = pathname.slice(pathname.lastIndexOf("/")+1);

        return blogCtrl.getDetail(blog_id);

  }else if(method === "GET" && pathname === "/api/update"){ //更新博客内容

        const { blog_id,content } = params;

        return blogCtrl.updateBlog(blog_id,content);

  }

  return null;

}


module.exports = blogRoute;