const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const ar_authGuard = require("./ar_guards/auth.guard");
const ar_orderController = require("../ar_controllers/order.constroller");

router.get("/ar_verify-order", ar_authGuard.isAuth, ar_orderController.getOrderVerify );
router.get("/ar_orders", ar_authGuard.isAuth, ar_orderController.getOrder );
router.post("/ar_orders", ar_authGuard.isAuth, bodyParser.urlencoded({extended: true}),
    check("address").not().isEmpty().withMessage("أدخل العنوان").isLength({  max: 60 }).withMessage("العنوان يجب الا يتعدي 60 حرف"),
    check("phonenumber").not().isEmpty().withMessage("أدخل رقم الهاتف").isNumeric().isLength({ min: 11, max: 11 }),
    ar_orderController.postOrder );

router.post("/ar_orders/cancel", ar_authGuard.isAuth, bodyParser.urlencoded({extended: true}), ar_orderController.postCancel );

module.exports = router;

