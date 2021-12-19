const express = require("express");
const router = express.Router();
const controller = require("../controllers/person");

//localhost:5000/api/person
router.get("/", controller.getAll);

//localhost:5000/api/person
router.post("/", controller.create);

//localhost:5000/api/person/:id
router.get("/:id", controller.getById);

//localhost:5000/api/person/:id
router.delete("/:id", controller.delete);

//localhost:5000/api/person/:id
router.patch("/:id", controller.update);

module.exports = router;
