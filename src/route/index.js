const HomeRouter=require("./home");
const WomenRouter=require("./women")
function Route(App){
    App.use("/",HomeRouter);
    App.use("/women",WomenRouter);
}
module.exports =Route;