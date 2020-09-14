const router          = require("express").Router();
const check           = require("express-validator").check;
const multer          = require("multer");
const bodyParser      = require("body-parser"); 
const ar_adminController = require("../ar_controllers/admin.controller");
const ar_adminGuard      = require("./ar_guards/admin.guard");

router.get("/cadd", ar_adminGuard, ar_adminController.getStore );
router.post("/cadd/deleteStore", ar_adminGuard, bodyParser.urlencoded({ extended: true }), ar_adminController.deleteStore );
router.get("/users", ar_adminGuard, ar_adminController.getAllUsers );
//=====================================================================================================
router.get("/add", ar_adminGuard, ar_adminController.getAdd );
router.post("/add", ar_adminGuard, multer({ 
        storage: multer.diskStorage({
            destination: (req, file, cb) => { cb(null, "images/")},
            filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname)}
        })}).single("image"),
    check("name").not().isEmpty().withMessage("أدخل اسم المنتج"),
    check("price").not().isEmpty().withMessage("أدخل السعر").isFloat({min: 0.0009}).withMessage("أدخل السعر"),
    check("description").not().isEmpty().withMessage("أدخل وصف المنتج"),
    check("category").not().isEmpty().withMessage("اختار القائمه"),
    check("image").custom((value, { req }) => {
        if (req.file) return true; 
        else throw "حمل الصورة";
    }), ar_adminController.postAdd);

router.get("/ar_orders", ar_adminGuard, ar_adminController.getOrders);
router.post("/ar_orders", ar_adminGuard, bodyParser.urlencoded({ extended: true }), ar_adminController.postOrders);
router.post("/ar_orders/cancel", ar_adminGuard, bodyParser.urlencoded({ extended: true }), ar_adminController.postCancel );

module.exports = router;
