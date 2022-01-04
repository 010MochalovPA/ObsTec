const Vendor = require("../models/Vendor");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (request, response) => {
  // получить всех производителей
  try {
    const vendors = await Vendor.find({});
    response.status(200).json(vendors);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.getById = async (request, response) => {
  // Получить производителя
};
module.exports.create = async (request, response) => {
  // Создать тип устройства
  try {
    const vendor = await new Vendor({
      name: request.body.name,
    }).save();
    response.status(201).json(vendor);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.update = async (request, response) => {
  try {
    const vendor = await Vendor.findOneAndUpdate({ _id: request.params._id }, { $set: request.body }, { new: true });
    response.status(200).json(vendor);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  try {
    await Vendor.remove({ _id: request.params._id });
    response.status(200).json({
      message: "Позиция была удалена",
    });
  } catch (e) {
    errorHandler(response, e);
  }
};
