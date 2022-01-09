// Запасные части
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const partSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("parts", partSchema);
