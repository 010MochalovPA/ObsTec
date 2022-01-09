// Отделы
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ParentId: {
    // связь с управленим
    ref: "units",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("groups", groupSchema);
