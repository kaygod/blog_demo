exports.salt = "kaygod";//加密用的盐

const host = "localhost";

//redis配置
exports.redisConfig = {
    host,
    port:6379
}

//mysql配置
exports.mysqlConfig = {
    host,
    user:"root",
    database:"blog",
    password:"123123",
    port:3306
}