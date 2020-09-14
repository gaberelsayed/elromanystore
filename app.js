const express = require("express");
const path = require("path");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const ar_homeRouter    = require("./ar_routes/home.route");
const ar_productRouter = require("./ar_routes/product.route");
const ar_authRouter    = require("./ar_routes/auth.route");
const ar_cartRouter    = require("./ar_routes/cart.route");
const ar_adminRouter   = require("./ar_routes/admin.route");
const ar_orderRouter   = require("./ar_routes/orders.route");
const app = express();

app.use(express.static(path.join(__dirname, "ar_assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());

const STORE = new SessionStore({
    uri: "mongodb+srv://Hany_Sabeh:H@Ny$@Be7@cluster0.i6gw8.mongodb.net/online-shop?retryWrites=true&w=majority",
    collection: "sessions"
});

app.use( session({
    secret: "this is my secret secret to hash express sessions ......",
    saveUninitialized: true,
    resave: true,
    store: STORE }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/",           ar_homeRouter);
app.use("/",           ar_authRouter);
app.use("/ar_product", ar_productRouter);
app.use("/ar_cart",    ar_cartRouter);
app.use("/admin",      ar_adminRouter);
app.use("/",           ar_orderRouter);

app.get("/ar_error", (req, res, next) => {
    res.status(500);
    res.render("ar_error.ejs", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "خطأ"
    });
});

app.get("/ar_not-admin", (req, res, next) => {
    res.status(403);
    res.render("ar_not-admin", {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: "غير مسموح"
    });
});

app.get("/ar_Contact_Us", (req, res, next) => {
    res.status(403);
    res.render("ar_Contact_Us", {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: "إتصل بنا"
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.render("ar_not-found", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "الصفحة غير موجودة"
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log("server listen on port " + port); });


