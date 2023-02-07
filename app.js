let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// 使用ejs模板
let ejs = require('ejs');

let app = express();

// view engine setup
// 初始化view模板和引擎
app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.__express);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 页面
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 如果用户页面没有起作用就接着运行
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
