const AtelierController = require("../../http/controllers/api/atelier/atelier.controller");
const {isAtelier} = require("./../../http/middlewares/checkRole")
const router = require("express").Router();
router.post("/save-request",isAtelier, AtelierController.saveRequest)
router.get("/profile/:id")
router.get("/get-requests")
router.post("/set-requests")
module.exports = router;