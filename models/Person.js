const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: false,
  },
  officeNumber: {
    type: Number,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("persons", personSchema);
