const express = require("express");
const router = express.Router();
const controller = require("../controllers/group");
const passport = require("passport");

//localhost:5000/api/group
router.get("/", passport.authenticate("jwt", { session: false }), controller.getAll);

//localhost:5000/api/group/:id
router.get("/:id", passport.authenticate("jwt", { session: false }), controller.getById);

//localhost:5000/api/group/:id
router.delete("/:id", passport.authenticate("jwt", { session: false }), controller.delete);

//localhost:5000/api/group/
router.post("/", passport.authenticate("jwt", { session: false }), controller.create);

//localhost:5000/api/group/:id
router.patch("/:id", passport.authenticate("jwt", { session: false }), controller.update);

module.exports = router;
