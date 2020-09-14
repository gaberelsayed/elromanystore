const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;

exports.getSignup = (req, res, next) => {
    res.render("ar_signup", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        isUser: false,
        isAdmin: false,
        pageTitle: "أنشئ حساباً"
    });
};

exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .createNewUser(req.body.username, req.body.phonenumber, req.body.address, req.body.email, req.body.password)
            .then(() => res.redirect("/ar_login"))
            .catch(err => {
                req.flash("authError", err);
                res.redirect("/ar_signup"); 
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/ar_signup");
    }
};

exports.getLogin = (req, res, next) => {
    res.render("ar_login", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        isUser: false,
        isAdmin: false,
        pageTitle: "سجل الدخول"
    });
};

exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .login(req.body.email, req.body.password)
            .then(result => {
                req.session.userId = result.id;
                req.session.isAdmin = result.isAdmin;
                res.redirect("/");
            })
            .catch(err => {
                req.flash("authError", err);
                res.redirect("/ar_login");
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/ar_login");
    }
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
