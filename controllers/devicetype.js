const DeviceType = require("../models/DeviceType");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (request, response) => {
  // получить все типы устройств
  try {
    const devicetypes = await DeviceType.find({});
    response.status(200).json(devicetypes);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getById = async (request, response) => {
  // Получить тип девайся
};
module.exports.create = async (request, response) => {
  // Создать тип устройства
  try {
    const deviceType = await new DeviceType({
      name: request.body.name,
    }).save();
    response.status(201).json(deviceType);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.update = async (request, response) => {
  // изменить тип устройства
};
module.exports.delete = async (request, response) => {
  // удалить тип устройства
};
