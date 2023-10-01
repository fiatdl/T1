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
const Route = require("./route/index.route");
var cookieParser = require("cookie-parser");

const DeviceDetector = require('node-device-detector');


const session = require('express-session');


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "995051606326-qofa95ttdiic99l0kckrac33p0bpch6q.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));


app.get("/vkl/dkm", (req, res, next) => {
    res.render("cc");
})

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        res.cookie("userProfile", userProfile._json);
        res.redirect('/login/auth/google');
    });


app.get('/error', (req, res) => res.send("error logging in"));

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