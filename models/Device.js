const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  deviceTypeId: {
    ref: "devicetypes",
    type: Schema.Types.ObjectId,
  },
  deviceModel: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  inventoryNumber: {
    type: Number,
    required: true,
  },
  unitId:{
    ref: "units",
    type: Schema.Types.ObjectId,
    required: true,
  },
  groupId:{
    ref: "groups",
    type: Schema.Types.ObjectId,
    required: true,
  },
  ipAddress: {
    type: String,
    required: false,
  },
  isRepair:{
    type: Boolean,
    required: true,
  },
  personId: {
    ref: "persons",
    type: Schema.Types.ObjectId,
    required: false,
  },
});

module.exports = mongoose.model("devices", deviceSchema);
