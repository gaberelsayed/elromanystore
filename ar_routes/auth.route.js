const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const ar_authGuard = require("./ar_guards/auth.guard");
const ar_authController = require("../ar_controllers/auth.controller");

router.get("/ar_signup", ar_authGuard.notAuth, ar_authController.getSignup );   // Remove Rendering to REST API
router.post("/ar_signup",
    ar_authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),                                  // Remove Rendering to REST API
    check("username").not().isEmpty().withMessage("أدخل اسم المستخدم"),
    check("phonenumber").not().isEmpty().isNumeric().withMessage("أدخل رقم الهاتف").isLength({ min: 11, max:11 }).withMessage("ادخل رقم الهاتف الصحيح"),
    check("address").not().isEmpty().withMessage("أدخل العنوان").isLength({ max:60 }).withMessage("العنوان يجب الا يزيد عن 60 حرفاً"),
    check("email").not().isEmpty().withMessage("أدخل البريد الالكتروني").isEmail().withMessage("أدخل البريد الالكتروني"),
    check("password").not().isEmpty().withMessage("أدخل الرقم السري").isLength({ min: 6 }).withMessage("الرقم السري لابد أن يتكون من 6 حروف علي الاقل"),
    check("confirmPassword").custom((value, { req }) => {
        if (value === req.body.password) return true;
        else throw "الرقم السري غير متطابق";
    }),
    ar_authController.postSignup
    );

router.get("/ar_login/", ar_authGuard.notAuth, ar_authController.getLogin);   // Remove Rendering to REST API
router.post("/ar_login/",
    ar_authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }), 
    check("email").not().isEmpty().withMessage("البريد الالكتروني").isEmail().withMessage("أدخل البريد الالكتروني"),
    check("password").not().isEmpty().withMessage("أدخل الرقم السري").isLength({ min: 6 }).withMessage("الرقم السري لابد أن يتكون من 6 حروف علي الاقل"),
    ar_authController.postLogin
    );

router.all("/ar_logout", ar_authGuard.isAuth, ar_authController.logout );
module.exports = router;
