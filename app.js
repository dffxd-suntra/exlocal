let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// 使用ejs模板
let ejs = require("ejs");

let app = express();

// view engine setup
// 初始化view模板和引擎
app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.__express);
app.set("view engine", "html");

// 控制台日记输出
app.use(logger("dev"));
// https://expressjs.com/en/4x/api.html#express.json
app.use(express.json());
// https://expressjs.com/en/4x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());

/* // 取消注释来允许跨域
app.use(function (req, res, next) {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
    });
    next();
}); */

// 开放public里面的所有文件
app.use(express.static(path.join(__dirname, "public")));

// 检查是否安装
let installRouter = require("./routes/install");
app.use(installRouter);

// 主页面
let indexRouter = require("./routes/index");
app.use("/", indexRouter);

// 如果没有返回页面就到错误部分
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
