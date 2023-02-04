class Home
{
    index(req,res,next){
        res.render("home");
    }
}
module.exports =new Home();
