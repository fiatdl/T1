const HomeRouter = require("./home");
const ProductRouter = require("./product");
const addProduct = require("./addProduct");
const Resister = require("./register");
const LoginRouter = require("./login");
const LogoutRouter = require("./logout");
const CartRouter = require("./cart");
function Route(App) {
  App.use("/", HomeRouter);
  App.use("/cart", CartRouter);
  App.use("/register", Resister);
  App.use("/login", LoginRouter);
  App.use("/product", ProductRouter);
  App.use("/add", addProduct);
  App.use("/logout", LogoutRouter);
}
module.exports = Route;
