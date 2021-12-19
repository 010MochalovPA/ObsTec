const express = require("express");
const router = express.Router();
const controller = require("../controllers/device");

//localhost:5000/api/device
router.get("", controller.getAll);

//localhost:5000/api/device/:devicetype
router.get("/:devicetype", controller.getByType);

//localhost:5000/api/device/:person
router.get("/:person", controller.getByPerson);

//localhost:5000/api/device
router.post("/", controller.create);

//localhost:5000/api/device/:id
router.patch("/:id", controller.update);

//localhost:5000/api/device/:id
router.delete("/:id", controller.delete);

module.exports = router;
