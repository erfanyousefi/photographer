const {BearerAuthenticated} = require("./../http/middlewares/authentication")
const {isActive} = require("./../http/middlewares/checkuser")
const router = require("express").Router();
const authRoutes = require("./auth/auth")
router.use("/auth", authRoutes);
router.use(BearerAuthenticated)
router.use(isActive)
router.get("/", (req, res, next) => {
    res.json({Message : "Hello"})
})
module.exports = router;