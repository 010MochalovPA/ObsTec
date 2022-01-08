const Unit = require("../models/Unit");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (request, response) => {
  // получить все типы устройств
  try {
    const units = await Unit.find({});
    response.status(200).json(units);
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
  const units = await Unit.find({});
  units.forEach(unit => {
    if (unit.name.toLowerCase() === request.body.name.toLowerCase()) isDublicated = true;
  });
  if (isDublicated) {
    response.status(409).json({
      message: "Управление уже существует!",
    });
  } else {
    try {
      const unit = await new Unit({
        name: request.body.name,
      }).save();
      response.status(201).json(unit);
    } catch (e) {
      errorHandler(response, e);
    }
  }
};
module.exports.update = async (request, response) => {
  try {
    const unit = await Unit.findOneAndUpdate({ _id: request.params.id }, { $set: request.body }, { new: true });
    response.status(200).json(unit);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  try {
    await Unit.deleteOne({ _id: request.params.id });
    response.status(200).json({
      message: "Управление удалено",
    });
  } catch (e) {
    errorHandler(response, e);
  }
};
