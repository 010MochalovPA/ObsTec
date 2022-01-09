const Part = require("../models/Part");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (request, response) => {
  // получить все запасные части
  try {
    const parts = await Part.find({});
    response.status(200).json(parts);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getById = async (request, response) => {
  // Получить запасные части по Id
};
module.exports.create = async (request, response) => {
  // Создать запасную часть
  isDublicated = false;
  const parts = await Part.find({});
  parts.forEach(unit => {
    if (unit.name.toLowerCase() === request.body.name.toLowerCase()) isDublicated = true;
  });
  if (isDublicated) {
    response.status(409).json({
      message: "Запасная часть уже существует!",
    });
  } else {
    try {
      const part = await new Part({
        name: request.body.name,
      }).save();
      response.status(201).json(part);
    } catch (e) {
      errorHandler(response, e);
    }
  }
};
module.exports.update = async (request, response) => {
  // Изменить запасную часть
  try {
    const part = await Part.findOneAndUpdate({ _id: request.params.id }, { $set: request.body }, { new: true });
    response.status(200).json(part);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  // Удалить запасную часть
  try {
    await Part.deleteOne({ _id: request.params.id });
    response.status(200).json({
      message: "Запасная часть удалена",
    });
  } catch (e) {
    errorHandler(response, e);
  }
};
