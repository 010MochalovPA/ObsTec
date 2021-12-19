const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const authRoutes = require("./routes/auth");
const personRoutes = require("./routes/person");
const deviceRoutes = require("./routes/device");
const deviceTypeRoutes = require("./routes/devicetype");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/person", personRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/devicetype", deviceTypeRoutes);
module.exports = app;
