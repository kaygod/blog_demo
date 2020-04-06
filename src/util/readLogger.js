const readline = require('readline');
const fs = require("fs");
/**
 * 读取日志
 */
exports.readLogger = (pagePath,res,resolve)=>{
    
    const readStream = fs.createReadStream(pagePath);

    const rl = readline.createInterface({
      input: readStream
    })

    let array = [];

    //每读取一行触发函数
    rl.on('line',line=>{
        array.push(line.toString());
    });

    rl.on("close", function(){
        // 结束程序
        let start_index = array.length - 8;

        if(start_index<0){
            start_index = 0;
        }

        array = array.slice(start_index);

        res.end(array.join("<br/><br/>"));

        resolve(true);

    });
    
}
    