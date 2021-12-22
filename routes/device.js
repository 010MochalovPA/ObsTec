const express = require("express");
const router = express.Router();
const controller = require("../controllers/device");
const passport = require("passport");

//localhost:5000/api/device
router.get("/", passport.authenticate("jwt", { session: false }), controller.getAll);

//localhost:5000/api/device/:id
router.get("/:id", passport.authenticate("jwt", { session: false }), controller.getById);

//localhost:5000/api/device/:devicetypeId
router.get("/devicetype/:deviceTypeId", passport.authenticate("jwt", { session: false }), controller.getByTypeId);

//localhost:5000/api/device/:personId
// router.get("/:personId", passport.authenticate("jwt", { session: false }), controller.getByPersonId);

//localhost:5000/api/device
router.post("/", passport.authenticate("jwt", { session: false }), controller.create);

//localhost:5000/api/device/:id
router.patch("/:id", passport.authenticate("jwt", { session: false }), controller.update);

//localhost:5000/api/device/:id
router.delete("/:id", passport.authenticate("jwt", { session: false }), controller.delete);

module.exports = router;
