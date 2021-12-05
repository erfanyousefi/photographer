const {BearerAuthenticated} = require("./../http/middlewares/authentication")
const {isActive} = require("./../http/middlewares/checkuser")
const router = require("express").Router();
const authRoutes = require("./auth/auth")
const photographerRoutes = require("./photographers/photographers")
const atelierRoutes = require("./atelier/atelier")
const UserRoutes = require("./user/user")
router.use("/auth", authRoutes);
router.use(BearerAuthenticated)
router.use(isActive)
router.use("/photographer", photographerRoutes);
router.use("/atelier", atelierRoutes);
router.use("/user", UserRoutes);
router.get("/", (req, res, next) => {
    res.json({Message : "Hello"})
})
module.exports = router;