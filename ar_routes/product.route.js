const router = require("express").Router();
const ar_productController = require("../ar_controllers/product.controller");

router.get("/", ar_productController.getProduct);
router.get("/:id", ar_productController.getProductById);

module.exports = router;


