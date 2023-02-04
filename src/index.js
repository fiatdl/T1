const express=require("express")
const morgan=require("morgan")
const path=require("path")
const router = express.Router();
const engine=require("express-handlebars")
const bodyParser = require("body-parser");
const port =3000;
const db=require("./db/index");
const app= express();
const mongoose = require("mongoose");
const Route=require("./route/index");
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.engine("hbs", engine.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

mongoose.set("strictQuery", false);
db.connect();

Route(app);
app.listen(port, () => console.log(`your app listening on port :${port}`));