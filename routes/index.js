let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.type("text/html");
    res.render("index", { title: "主页", content: {} });
});

module.exports = router;
