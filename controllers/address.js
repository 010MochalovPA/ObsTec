const Address = require("../models/Address");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (request, response) => {
  // получить все адреса
  try {
    const addresses = await Address.find({});
    response.status(200).json(addresses);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getById = async (request, response) => {
  // Получить адрес по id
};
module.exports.create = async (request, response) => {
  // Создать адрес
  try {
    const address = await new Address({
      postalCode: request.body.postalCode,
      locality: request.body.locality,
      street: request.body.street,
      number: request.body.number,
    }).save();
    response.status(201).json(address);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.update = async (request, response) => {
  // Изменить адрес
  try {
    const address = await Address.findOneAndUpdate({ _id: request.params.id }, { $set: request.body }, { new: true });
    response.status(200).json(address);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  // Удалить адрес
  try {
    await Address.deleteOne({ _id: request.params.id });
    response.status(200).json({
      message: "Адрес удален",
    });
  } catch (e) {
    errorHandler(response, e);
  }
};
