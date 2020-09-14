const cartModel = require("../models/cart.model");
const validationResult = require("express-validator").validationResult;

exports.getCart = (req, res, next) => {
    cartModel.getItemsByUser(req.session.userId)
        .then(items => {
            res.render("ar_cart", {
                items: items,
                isUser: true,
                isAdmin: req.session.isAdmin,
                pageTitle: "عربة التسوق"
            });
        }).catch(err => {
            res.redirect("/ar_error");
        });
};

exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.addNewItem({
                name: req.body.name,
                price: req.body.price,
                amount: req.body.amount,
                productId: req.body.productId,
                userId: req.session.userId,
                timestamp: Date.now()
            }).then(() => {
                res.redirect("/ar_cart");
            }).catch(err => {
                res.redirect("/ar_error");
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect(req.body.redirectTo);
    }
};

exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.editItem(req.body.cartId, {
                amount: req.body.amount,
                timestamp: Date.now()
            }).then(() => res.redirect("/ar_cart"))
            .catch(err => res.redirect("/ar_error"));
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/ar_cart");
    }
};

exports.postDelete = (req, res, next) => {
    cartModel.deleteItem(req.body.cartId)
        .then(() => res.redirect("/ar_cart"))
        .catch(err => res.redirect("/ar_error"));
};
