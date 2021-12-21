const Device = require("../models/Device");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (request, response) => {
  // Получение всех устройств
  try {
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getById = async (request, response) => {
  // Получение всех устройств
  try {
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getByTypeId = async (request, response) => {
  // Получить по типу устройства
  try {
    const devices = await Device.find({
      deviceTypeId: request.params.deviceTypeId,
    });
    response.status(200).json(devices);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getByPersonId = async (request, response) => {
  // Получить по сотруднику
  try {
  } catch (e) {
    errorHandler(response, e);
  }
};

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
