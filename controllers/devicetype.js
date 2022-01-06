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
  isDublicated = false;
  const devicetypes = await DeviceType.find({});
  devicetypes.forEach(devicetype => {
    if (devicetype.name.toLowerCase() === request.body.name.toLowerCase()) isDublicated = true;
  });
  if (isDublicated) {
    response.status(409).json({
      message: "Данный тип уже существует",
    });
  } else {
    try {
      const devicetype = await new DeviceType({
        name: request.body.name,
      }).save();
      response.status(201).json(devicetype);
    } catch (e) {
      errorHandler(response, e);
    }
  }
};
module.exports.update = async (request, response) => {
  try {
    const deviceType = await DeviceType.findOneAndUpdate({ _id: request.params.id }, { $set: request.body }, { new: true });
    response.status(200).json(deviceType);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  try {
    await DeviceType.remove({ _id: request.params.id });
    response.status(200).json({
      message: "Тип устройства удален",
    });
  } catch (e) {
    errorHandler(response, e);
  }
};
