const router = require("express").Router();
const bodyParser        = require("body-parser");
const ar_adminGuard     = require("./ar_guards/admin.guard");
const ar_homeController = require("../ar_controllers/home.controller");

router.get("/", ar_homeController.getHome );
router.get('/page:page', ar_homeController.getHome );
router.post("/deleteProduct", ar_adminGuard, bodyParser.urlencoded({ extended: true }), ar_homeController.deleProduct );

module.exports = router;

