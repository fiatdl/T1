class Home {
    index(req, res, next) {
        let isAdmin = false;
        if (req.cookies.role) {
            isAdmin = req.cookies.role === "admin" ? true : false;
        }
        else { isAdmin = false; }

        res.render("home", { admin: true, admin: isAdmin });

    }
}
module.exports = new Home();
