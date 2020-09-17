const productsModel = require("../models/products.model");
const authModel = require("../models/auth.model");

exports.getHome = (req, res, next) => {
    var page = req.params.page || 1;
    var category = req.query.category;
    var validCategories = ["clothes", "Slimming", "Beauty", "Glasses", "Foods", "Antiseptics", "Perfumes"];
    var productsPromise;
    if (category && validCategories.includes(category))
        productsPromise = productsModel.getProductsByCategory(category);
    else productsPromise = productsModel.getAllProducts(page);
    productsPromise.then( products => {
        res.render("ar_index", {
            products: products,
            current: page,
            pages: 50,            //Math.ceil(products.length / 8),
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash("validationErrors")[0],
            pageTitle: "الروماني"
        });
    }).catch(err => { console.log(err); });
};
 
exports.deleProduct = (req, res, next) => {
    var id = req.body.id;
    productsModel.delProduct(id)
    .then(() => res.redirect("/"))
    .catch(err => {
        res.redirect("/ar_error");
    });
};



