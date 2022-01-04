const Device = require("../models/Device");
const DeviceType = require("../models/DeviceType");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (request, response) => {
  // Получение всех устройств
  try {
    const types = await DeviceType.find({});
    const devices = await Device.find({});
    devices.map(item => {
      item.deviceTypeName = types.find(type => type._id.equals(item.deviceTypeId)).name;
      return item;
    });
    response.status(200).json(devices);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getById = async (request, response) => {
  // Получение по id
  try {
    response.status(200).json({ message: "ok" });
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getByTypeId = async (request, response) => {
  // Получить по типу устройства

  try {
    const type = await DeviceType.findOne({
      _id: request.params.deviceTypeId,
    });
    const devices = await Device.find({
      deviceTypeId: request.params.deviceTypeId,
    });
    const ResponseDevices = devices.map(item => {
      item.deviceTypeName = type.name;
      return item;
    });
    response.status(200).json(ResponseDevices);
  } catch (e) {
    errorHandler(response, e);
  }
};
// module.exports.getByPersonId = async (request, response) => {
//   // Получить по сотруднику
//   try {
//   } catch (e) {
//     errorHandler(response, e);
//   }
// };

module.exports.create = async (request, response) => {
  // Создать устройство
  try {
    const device = await new Device({
      deviceTypeId: request.body.deviceTypeId,
      deviceModel: request.body.deviceModel,
      serialNumber: request.body.serialNumber,
      inventoryNumber: request.body.inventoryNumber,
      ipAdress: request.body.ipAdress,
      personId: request.body.personId,
    }).save();
    response.status(201).json(device);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.update = async (request, response) => {
  // изменить устройства
  try {
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  // удалить устройство
  try {
  } catch (e) {
    errorHandler(response, e);
  }
};
