const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const ar_authGaurd = require("./ar_guards/auth.guard");
const ar_cartController = require("../ar_controllers/cart.controller");

router.get("/", ar_authGaurd.isAuth, ar_cartController.getCart );
router.post("/", ar_authGaurd.isAuth, bodyParser.urlencoded({ extended: true }),
    check("amount").not().isEmpty().withMessage("أدخل الكميه المطلوبه")
    .isInt({ min: 1 }).withMessage("أقل كميه هي قطعه واحدة"),
    ar_cartController.postCart );

router.post("/save", ar_authGaurd.isAuth, bodyParser.urlencoded({ extended: true }),
    check("amount").not().isEmpty().withMessage("أدخل الكميه المطلوبه")
    .isInt({ min: 1 }).withMessage("أقل كميه هي قطعه واحدة"),
    ar_cartController.postSave );

router.post("/delete", ar_authGaurd.isAuth, bodyParser.urlencoded({ extended: true }),
    ar_cartController.postDelete );

module.exports = router;


