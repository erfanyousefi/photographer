const router = require("express").Router();
const authValidator = require("./../../http/validators/auth")
const authController = require("./../../http/controllers/api/auth/auth.controller")
const errorHandler = require("./../../http/middlewares/errorHandler")
router.post("/register", authValidator.register(),errorHandler , authController.register)
router.post("/login", authController.login)
router.post("/forget-password", authValidator.forgetPassword(), errorHandler, authController.forgotPassword)
router.post("/verify-password-token",authValidator.verifyPasswordToken(), errorHandler, authController.verifyForgotPassword)
module.exports = router;