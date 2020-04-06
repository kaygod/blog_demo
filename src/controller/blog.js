const { Success,Fail } = require("../models/Response");
const { getBlog,getNumbers,addBlog,delBlog,isExit,updateBlog } = require("../service/blog");
const { getUserInfo } = require("../service/user");
const xssFilters = require('xss-filters');
const { getDate } = require("../util/utils");

exports.addOne = async (user_id,content,title)=>{
  
    const result = await addBlog(user_id,xssFilters.inHTMLData(content),title);

    if(result){
        return new Success(result);
    }else{
        return new Fail(300,"新建博客失败");
    }

}

exports.delOne = async (user_id,blog_id)=>{
    
    const is_exit = await isExit(user_id,blog_id);

    if(!is_exit){
        return Fail(301,"您没有权限删除此博客");
    }
    
    const result = await delBlog(user_id,blog_id);

    if(result){
        return new Success();
    }else{
        return Fail(302,"博客删除失败");
    }

}

exports.getList = async (page_no)=>{

    const final_page = await getNumbers();

    const rows = await getBlog(page_no);

    let user_id_array = rows.map((item)=>{
        return item.user_id
    })

    user_id_array = [...new Set(user_id_array)];//数组去重

    const user_list = await getUserInfo(user_id_array);

    let obj = Object.create(null);

    user_id_array.reduce((prev,current,index)=>{
        obj[current] = user_list[index].user_name;
        return obj;
    },obj)

    rows.forEach((item,idx)=>{
        item.user_name = obj[item.user_id];
        item.time = getDate(item.time);
    })
 
    return new Success({
            final_page,
            msg_list:rows
    });
        
}

exports.getDetail = async (blog_id)=>{

    if(/^[0-9]+$/g.test(blog_id)){

        const result = (await getBlog(null,blog_id))[0];

        const user_info = (await getUserInfo(result.user_id))[0];

        result.user_name = user_info.user_name;

        result.time = getDate(result.time);

        return new Success(result)

    }else{
        return new Fail("blog_id不合法!");    
    }

}

exports.updateBlog = async (user_id,blog_id,content)=>{

    const is_exit = await isExit(user_id,blog_id);
    
    if(!is_exit){
        return Fail(305,"您没有权限更新此博客");
    }

    const result = await updateBlog(user_id,blog_id,content);

    if(result){
        return new Success();
    }else{
        return Fail(306,"更新博客失败");
    }

}