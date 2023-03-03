const productData = require("../models/product.model");
var Cookies = require("cookies-js");
class addProduct {
    index(req, res, next) {
        res.render("addProduct", { addProcessing: true });
    }

    index1(req, res, next) {
        const gender = req.cookies.gender;
        const manType = [
            ["ao", "áo"],
            ["domacngoai", "đồ mặc ngoài"],
            ["quan", "quần"],
            ["domactrong", "đồ mặc trong"],
            ["domacnha", "đồ mặc nhà"],
            ["dothethao", "đồ thể thao"]
        ];
        const womenType = [
            ["ao", "áo"],
            ["domacngoai", "đồ mặc ngoài"],
            ["quan", "quần"],
            ["chanvay", "chân váy"],
            ["dam", "đầm"],
            ["dolot", "đồ lót"],
            ["domacnha", "đồ mặc nhà"]
        ];
        const kidType = [["quan", "quần"], ["ao", "áo"], ["damyem", "đầm yếm"]];
        const phukien = [["mu", "mũ"], ["tui", "túi"]];
        const categories =
            gender === "women"
                ? womenType
                : gender === "men"
                    ? manType
                    : gender === "kid"
                        ? kidType
                        : phukien;
        res.render("addProduct1", { categories, addProcessing: true });
    }

    index2(req, res, next) {
        res.render("addProduct2", { addProcessing: true });
    }
    add0(req, res, next) {
        res.cookie("name", req.body.name);
        res.cookie("gender", req.body.gender);
        res.redirect("step1");
    }
    add1(req, res, next) {
        res.cookie("img", req.file.originalname);
        res.cookie("type", req.body.type);
        res.redirect("step2");
    }
    add2(req, res, next) {
        const newProduct = new productData({
            name: req.cookies.name,
            type: req.cookies.type,
            gender: req.cookies.gender,
            img: req.cookies.img,
            price: req.body.price,
        });
        res.clearCookie("name");
        res.clearCookie("gender");
        res.clearCookie("type");
        res.clearCookie("img");
        newProduct.save();
        res.redirect("/");
    }
}
module.exports = new addProduct();
