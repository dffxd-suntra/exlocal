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
    res.render("index", { title: "安装exlocal", content: {} });
});

// 接收安装信息
router.post("/install", function (req, res, next) {
    if (fs.existsSync("routes/install.lock")) {
        next();
        return;
    }
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
