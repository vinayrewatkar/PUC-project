const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const { searchProducts } = require('../controllers/amazonapi');
const { searchFlipkartProducts } = require('../controllers/flipkart'); // Import the Flipkart controller

router.route("/home").get(authcontroller.home);
router.route("/register").post(validate(signupSchema), authcontroller.register);
router.route("/login").post(authcontroller.login);
router.route("/products/search").post(searchProducts); // Amazon search endpoint
router.route("/flipkart/search").post(searchFlipkartProducts); // Flipkart search endpoint

module.exports = router;
