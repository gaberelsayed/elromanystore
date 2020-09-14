const productsModel = require("../models/products.model");

exports.getProduct = (req, res, next) => {
    productsModel.getFirstProduct().then(product => {
            res.render("ar_product", {
                product: product,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: "بيانات المنتج"
            });
        }).catch(err => res.redirect("/ar_error"));
};

exports.getProductById = (req, res, next) => {
    let id = req.params.id;
    productsModel.getProductById(id).then(product => {
            res.render("ar_product", {
                product: product,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                pageTitle: product.name
            });
        }).catch(err => res.redirect("/ar_error"));
};
