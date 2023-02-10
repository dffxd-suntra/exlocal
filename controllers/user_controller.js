// 初始化数据库
let knex = require('knex')({
    client: "better-sqlite3",
    connection: {
        filename: "../database/comic.sqlite3"
    }
});

module.exports