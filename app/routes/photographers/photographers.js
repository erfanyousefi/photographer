const router = require("express").Router();
const { isPhotographer } = require("../../http/middlewares/checkRole");
const PhotographerController = require("./../../http/controllers/api/photographer/photographer.controller")
router.get("/", PhotographerController.getAllPhotographers)
router.get("/requests",isPhotographer, PhotographerController.getAllRequests)
router.get("/requests/pending",isPhotographer, PhotographerController.getPendingRequests)
router.get("/requests/confirmed",isPhotographer, PhotographerController.getConfirmedRequests)
router.get("/requests/canceled",isPhotographer, PhotographerController.getCanceledRequests)
router.get("/profile/:id")
router.post("/confirm-request/:id", isPhotographer, PhotographerController.confirmRequest)
router.get("/cancel-request/:id", isPhotographer, PhotographerController.cancelRequest)
module.exports = router;