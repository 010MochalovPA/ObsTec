// Производители
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("vendors", vendorSchema);
