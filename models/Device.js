const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  deviceTypeId: {
    ref: "deviceTypes",
    type: Schema.Types.ObjectId,
  },
  deviceModel: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  inventoryNumber: {
    type: Number,
    required: true,
  },
  ipAdress: {
    type: String,
    required: false,
  },
  personId: {
    ref: "persons",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("devices", deviceSchema);
