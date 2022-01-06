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
  // Добавить нового производителя
  isDublicated = false;
  const vendors = await Vendor.find({});
  vendors.forEach(vendor => {
    if (vendor.name.toLowerCase() === request.body.name.toLowerCase()) isDublicated = true;
  });
  if (isDublicated) {
    response.status(409).json({
      message: "Производитель уже существует",
    });
  } else {
    try {
      const vendor = await new Vendor({
        name: request.body.name,
      }).save();
      response.status(201).json(vendor);
    } catch (e) {
      errorHandler(response, e);
    }
  }
};
module.exports.update = async (request, response) => {
  try {
    const vendor = await Vendor.findOneAndUpdate({ _id: request.params.id }, { $set: request.body }, { new: true });
    response.status(200).json(vendor);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  try {
    await Vendor.remove({ _id: request.params.id });
    response.status(200).json({
      message: "Производитель удален",
    });
  } catch (e) {
    errorHandler(response, e);
  }
};
