var Cookies = require("cookies-js");
class LogOutController {
    index(req, res, next) {
        res.clearCookie("token");
        res.clearCookie("id");

        res.clearCookie("avatar");
        res.clearCookie("username");
        res.clearCookie("password");
        res.render("login", { user: {} });
    }
}
module.exports = new LogOutController();
