const express = require("express");
const router = express.Router();
const controller = require("../controllers/device");

//localhost:5000/api/device
router.get("/", controller.getAll);

//localhost:5000/api/device/:id
router.get("/:id", controller.getById);

//localhost:5000/api/device/:devicetype
router.get("/:devicetypeId", controller.getByTypeId);

//localhost:5000/api/device/:person
router.get("/:personId", controller.getByPersonId);

//localhost:5000/api/device
router.post("/", controller.create);

//localhost:5000/api/device/:id
router.patch("/:id", controller.update);

//localhost:5000/api/device/:id
router.delete("/:id", controller.delete);

module.exports = router;
