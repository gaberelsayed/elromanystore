exports.isAuth = (req, res, next) => {
    if (req.session.userId) next();
    else res.redirect("/ar_login");
};

exports.notAuth = (req, res, next) => {
    if (!req.session.userId) next();
    else res.redirect("/");
};
