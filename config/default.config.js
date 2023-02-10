// 本文件为系统默认配置文件,如要自定义,请查看同目录下的user.config.js
// 注意! user.config.js 会覆盖 default.config.js

let config = {
    "http": true, // bool 
    "http_host": "127.0.0.1", // string
    "http_port": 80, // int

    "https": false, // bool
    "https_host": "127.0.0.1", // string
    "https_port": 443, // int
    "https_key": "", // string
    "https_cert": "" // string
};

module.exports = config;