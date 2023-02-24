// 初始化数据库
let db = require("better-sqlite3")("../database/comic.sqlite3");

// 存储所有键和是否必须
const TABEL_KEYS = [
    "uid",
    "username",
    "nickname",
    "password",
    "type",
    "level",
    "credit",
    "email",
    "phone",
    "state",
    "reg_date"
];

const MUST_HAVE = ["username", "password"];

module.exports = {
    createUser(options) {
        console.log(options);
        let temp = {};
        for (let i in MUST_HAVE) {
            temp[MUST_HAVE[i]] = false;
        }
        for (let i in options) {
            if (!TABEL_KEYS.includes(i)) {
                throw new Error("键 "+i+" 不存在");
            }
            if (MUST_HAVE.includes(i)) {
                temp[i] = true;
            }
        }
        for (let i in temp) {
            if (!temp[i]) {
                throw new Error("键 "+i+" 为必须");
            }
        }
        let keys = Object.keys(options);
        let values = Object.values(options);
        console.log((`INSERT INTO users(${keys.join(",")}) VALUES(${",?".repeat(values.length).substring(1)})`, values));
        db.run(`INSERT INTO users(${keys.join(",")}) VALUES(${",?".repeat(values.length).substring(1)})`, values);
    },
};