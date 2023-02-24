let express = require("express");
let router = express.Router();
let fs = require("fs");

// 直接获取页面
router.get("/install", function (req, res, next) {
    if (fs.existsSync("routes/install.lock")) {
        next();
        return;
    }
    res.type("text/html");
    res.render("index", {
        title: "安装exlocal",
        page: "install.html"
    });
});

// 接收安装信息
router.post("/install", function (req, res, next) {
    if (fs.existsSync("routes/install.lock")) {
        next();
        return;
    }
    // 获取并检测数据
    let username = req.body.username || null;
    let password = req.body.password || null;
    let nickname = req.body.nickname || null;
    let email = req.body.email || null;
    let phone = req.body.phone || null;

    if (username == null || password == null) {
        res.type("application/json");
        res.send(JSON.stringify({
            state: "fail",
            message: "请规范填写密码或用户名"
        }));
        return;
    }

    if (email != null && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
        res.type("application/json");
        res.send(JSON.stringify({
            state: "fail",
            message: "请规范填写邮箱地址"
        }));
        return;
    }

    // 初始化数据库
    let src = "database/template.comic.sqlite3";
    let dst = "database/comic.sqlite3";
    if (fs.existsSync(dst)) {
        fs.rmSync(dst);
    }
    fs.copyFileSync(src, dst);

    // 创建管理员账户
    let userController = require("../controllers/user_controller");

    // userController.createUser({ username, password, nickname, email, phone, type: "master" }); // js是支持这么个语法的

    // 新建锁文件,确保不会重复安装
    // fs.writeFileSync("routes/install.lock", "如要从新安装，请删除本文件");

    // 成功
    res.type("application/json");
    res.send(JSON.stringify({
        state: "success",
        message: "成功！"
    }));
});

// 未安装自动跳转
router.use(function (req, res, next) {
    if (fs.existsSync("routes/install.lock")) {
        next();
        return;
    }
    res.redirect(307, "/install");
});

module.exports = router;
