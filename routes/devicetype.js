const express = require("express");
const router = express.Router();
const controller = require("../controllers/devicetype");

//localhost:5000/api/devicetype
router.get("/", controller.getAll);

//localhost:5000/api/devicetype/:id
router.get("/:id", controller.getById);

//localhost:5000/api/devicetype/:id
router.delete("/:id", controller.delete);

//localhost:5000/api/devicetype/
router.post("/", controller.create);

//localhost:5000/api/devicetype/:id
router.patch("/:id", controller.update);

module.exports = router;
