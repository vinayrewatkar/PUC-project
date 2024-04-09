const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const validation=require("../controllers/puc-validation");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const ocr=require("../controllers/ocr-contoller-testing");

router.route("/home").get(authcontroller.home);
router.route("/register").post(validate(signupSchema),authcontroller.register);
router.route("/login").post(authcontroller.login);
router.route("/validate").post(validation.validatePUC);
router.route("/ocr").post(ocr.OCR);

module.exports = router;
