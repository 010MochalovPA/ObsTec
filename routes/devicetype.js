const express = require("express");
const router = express.Router();
const controller = require("../controllers/devicetype");
const passport = require("passport");

//localhost:5000/api/devicetype
router.get("/", passport.authenticate("jwt", { session: false }), controller.getAll);

//localhost:5000/api/devicetype/:id
router.get("/:id", passport.authenticate("jwt", { session: false }), controller.getById);

//localhost:5000/api/devicetype/:id
router.delete("/:id", passport.authenticate("jwt", { session: false }), controller.delete);

//localhost:5000/api/devicetype/
router.post("/", passport.authenticate("jwt", { session: false }), controller.create);

//localhost:5000/api/devicetype/:id
router.patch("/:id", passport.authenticate("jwt", { session: false }), controller.update);

module.exports = router;
