const router = require("express").Router();
const PhotographerController = require("./../../http/controllers/api/photographer/photographer.controller")
router.get("/", PhotographerController.getAllPhotographers)
router.get("/profile/:id")
router.get("/get-requests")
router.post("/set-requests")
module.exports = router;