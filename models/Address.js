const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  postalCode: {
    type: Number,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("addresses", addressSchema);
