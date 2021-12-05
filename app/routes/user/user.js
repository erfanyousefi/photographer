const router = require("express").Router();
const UserController = require("./../../http/controllers/api/user/user.controller")
router.get("/profile/employee/:id", UserController.showProfile)
router.put("/profile")
router.get("/my-requests")
router.post("/send-requests")
router.post("/save-rate")
module.exports = router;