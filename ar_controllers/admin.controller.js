const productsModel    = require("../models/products.model");
const ordersModel      = require("../models/order.model");
const productModel     = require("../models/products.model");
const usersModel     = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;

exports.getStore = (req, res, next) => {
    productModel.getAllProducts()
    .then(products => {
        res.render("ar_add-category", {
            pageTitle: "إدارة المخزن",
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash("validationErrors")[0],
        });
    }).catch(err => res.redirect("/ar_error"));
};
exports.deleteStore = (req, res, next) => {
    productModel.delProduct(req.body.id)
        .then(() => res.redirect("/admin/cadd"))
        .catch(err => { res.redirect("/ar_error"); });
};
//================================================================================
exports.getAllUsers = (req, res, next) => {
    usersModel.getAllUu()
    .then(users => {
        res.render("ar_Users", {
            pageTitle: "العملاء",
            users: users,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash("validationErrors")[0],
        });
    }).catch(err => res.redirect("/ar_error"));
};
//================================================================================
exports.getAdd = (req, res, next) => {
    res.render("ar_add-product", {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true,
        productAdded: req.flash("added")[0],
        pageTitle: "إضافة منتج جديد"
    });
}; 

exports.postAdd = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        req.body.image = req.file.filename;
        productsModel.addNewProduct(req.body)
            .then(() => {
                req.flash("added", true);
                res.redirect("/admin/add");
            }).catch(err => { res.redirect("/ar_error"); });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/admin/add");
    }
};

exports.getOrders = (req, res, next) => {
    ordersModel.getAllOrders()
        .then(items => {
            res.render("ar_manage-orders", {
                pageTitle: "إدارة الطلبات",
                isUser: true,
                isAdmin: true,
                items: items
            });
        }).catch(err => res.redirect("/ar_error"));
};

exports.postOrders = (req, res, next) => {
    ordersModel.editOrder(req.body.orderId, req.body.status)
        .then(() => res.redirect("/admin/ar_orders"))
        .catch(err => { res.redirect("/ar_error"); });
};
//============================================================================

exports.postCancel = (req, res, next) => {
    ordersModel.cancelOrderByAdmin(req.body.orderId)
        .then(() => res.redirect("/admin/ar_orders"))
        .catch(err => { res.redirect("/ar_error"); });
};
