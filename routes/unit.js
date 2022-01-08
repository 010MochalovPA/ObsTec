const express = require("express");
const router = express.Router();
const controller = require("../controllers/unit");
const passport = require("passport");

//localhost:5000/api/unit
router.get("/", passport.authenticate("jwt", { session: false }), controller.getAll);

//localhost:5000/api/unit/:id
router.get("/:id", passport.authenticate("jwt", { session: false }), controller.getById);

//localhost:5000/api/unit/:id
router.delete("/:id", passport.authenticate("jwt", { session: false }), controller.delete);

//localhost:5000/api/unit/
router.post("/", passport.authenticate("jwt", { session: false }), controller.create);

//localhost:5000/api/unit/:id
router.patch("/:id", passport.authenticate("jwt", { session: false }), controller.update);

module.exports = router;
