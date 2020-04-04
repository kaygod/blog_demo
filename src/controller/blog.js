const { Success,Fail } = require("../models/Response");

exports.addOne = (username,password)=>{
  
    return new Success({
        username,
        password
    });

}

exports.delOne = (blog_id)=>{
    return new Success();
}

exports.getList = (page_no)=>{
 
    return new Success({
            final_page:6,
            msg_list:[
            {
                blog_id:1,
                title:"那时花开月正源",
                user_name:"凯神",
                time:"2020-04-003"
            },
            {
                blog_id:2,
                title:"那时花开月正源",
                user_name:"凯神",
                time:"2020-04-03"
            }
        ]
    });
        
}

exports.getDetail = (blog_id)=>{

    if(/^[0-9]+$/g.test(blog_id)){

        return new Success({
          title:"那时花开月正源",
          content:"内容多得很",
          time:"2020-04-03",
          username:"凯神",
          user_id:1,
          blog_id
        })

    }else{
        return new Fail("blog_id不合法!");    
    }

}

exports.updateBlog = (blog_id,content)=>{

    return new Success();

}