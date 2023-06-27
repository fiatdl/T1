const express = require("express")
const morgan = require("morgan")
const path = require("path")
const router = express.Router();
const engine = require("express-handlebars")
const bodyParser = require("body-parser");
const port = 3000;
const db = require("./db/index");
const app = express();
const mongoose = require("mongoose");
const Route = require("./route/index");
var cookieParser = require("cookie-parser");

var paypal = require('paypal-rest-sdk');

app.use(cookieParser());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfQr4zXNUvWfWYLpLEmI-Z9Ua_1rrS6AM3dlZY8whMLtgfK_ooSgzquYhH22r_mkRXTdESli6KTkMFWL',
    'client_secret': 'EP0jEjZpyDsDDOl36LKM4_C5BqEBNkvUNX7g_-GS8l6XuiO6p98snChFcWlUtoTXm3JTakGXvIRtMBq_'
});



app.engine("hbs", engine.engine({ extname: ".hbs", helpers: require('./config/handlebars-helpers') }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

mongoose.set("strictQuery", false);
db.connect();

Route(app);
app.listen(port, () => console.log(`your app listening on port :${port}`));