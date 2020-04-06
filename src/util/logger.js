const fs = require("fs");
const path = require("path");
const { getDate } = require("./utils");

const createAccess = function(){

    const filePath = path.join(__dirname,"../log/access.log");

    const writeStream = fs.createWriteStream(filePath,{
        flags:"a"
    });

    return writeStream;

}

const writeStream = createAccess();


const access = (content)=>{

    writeStream.write(content+"\r\n","utf8");

}

exports.logger = (req,content)=>{
  
  const { url,method } = req;

  access(`${getDate(new Date().getTime())}----${method}----${url}----${JSON.stringify(content)}`);

}
