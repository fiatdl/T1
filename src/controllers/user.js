const userData = require("../models/users.model");
const productData = require("../models/product.model");
const oderData = require("../models/oder.model");
class user {
    setavatar(req, res, next) {

        res.render("setavatar", { addProcessing: true });
    }

    saveAvatar(req, res, next) {

        userData.findByIdAndUpdate({ _id: req.cookies.id }, { avatar: req.file.originalname }).then((love) => {
            res.json("success");
        }).catch(err => res.json("failed"))
    }
}
module.exports = new user();