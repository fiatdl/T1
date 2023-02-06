const productData=require("../models/product.model");
class addProduct
{
    index(req,res,next){
        res.render("addProduct");
    }
    add(req,res,next){
        const NewProduct=new productData({
            name:req.body.name,
            price:req.body.price,
            sex:req.body.sex,
            type:req.body.type,
             img: req.file.originalname,
        })
        NewProduct.save();
        res.render("addProduct");
    }
}
module.exports =new addProduct();
