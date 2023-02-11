class Home {
    index(req, res, next) {

        if (req.cookies.role)
            res.render("home", { admin: true });
        else { res.render("home") };
    }
}
module.exports = new Home();
