const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");
const validationResult = require("express-validator").validationResult;

exports.getOrderVerify = (req, res, next) => {
    cartModel.getItemById(req.query.order)
        .then(cartItem => {
            res.render("ar_verify-order", {
                cart: cartItem,
                isUser: true,
                isAdmin: req.session.isAdmin,
                pageTitle: "تأكيد الطلب",
                validationError: req.flash("validationErrors")[0]
            });
        }).catch(err => res.redirect("/ar_error"));
}; 

exports.getOrder = (req, res, next) => {
    orderModel.getOrdersByUser(req.session.userId)
        .then(items => {
            res.render("ar_orders", {
                pageTitle: "الطلبات",
                isUser: true,
                isAdmin: req.session.isAdmin,
                items: items
            });
        }).catch(err => res.redirect("/ar_error"));
}

exports.postOrder = (req, res, next) => {
    if (validationResult(req).isEmpty())
        orderModel
            .addNewOrder(req.body)
            .then(() => res.redirect("/ar_orders"))
            .catch(err => { res.redirect("/ar_error") });
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/ar_verify-order?order=" + req.body.cartId);
    }
}

exports.postCancel = (req, res, next) => {
    orderModel.cancelOrder(req.body.orderId)
        .then(() => res.redirect("/ar_orders"))
        .catch(err => { res.redirect("/ar_error") })
}
