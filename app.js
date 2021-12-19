const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const personRoutes = require("./routes/person");
const deviceRoutes = require("./routes/device");
const deviceTypeRoutes = require("./routes/devicetype");

const app = express();

mongoose
  .connect(require("./config/keys").mongoURI)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch(error => {
    console.log(error);
  });
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/person", personRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/devicetype", deviceTypeRoutes);
module.exports = app;
