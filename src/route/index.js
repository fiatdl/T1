const HomeRouter=require("./home");
const WomenRouter=require("./women")
const addProduct=require("./addProduct");
function Route(App){
    App.use("/",HomeRouter);
    App.use("/women",WomenRouter);
    App.use("/add",addProduct);
}
module.exports =Route;