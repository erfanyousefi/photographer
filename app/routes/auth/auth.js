const router = require("express").Router();
const authValidator = require("./../../http/validators/auth")
const authController = require("./../../http/controllers/api/auth/auth.controller")
const errorHandler = require("./../../http/middlewares/errorHandler")
router.post("/register", authValidator.register(),errorHandler , authController.register)
router.post("/login", authController.login)
// router.post("/forget-password")
module.exports = router;