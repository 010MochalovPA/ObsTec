const Group = require("../models/Group");
const errorHandler = require("../utils/errorHandler");

// module.exports.getAll = async (request, response) => {
//   // получить все типы устройств
//   try {
//     const groups = await Group.find({});
//     response.status(200).json(groups);
//   } catch (e) {
//     errorHandler(response, e);
//   }
// };
module.exports.getById = async (request, response) => {
  try {
    const groups = await Group.find({
      ParentId: request.params.ParentId,
    });
    response.status(200).json(groups);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.create = async (request, response) => {
  // Создать отдел
  isDublicated = false;
  const groups = await Group.find({});
  groups.forEach(group => {
    if (group.name.toLowerCase() === request.body.name.toLowerCase()) isDublicated = true;
  });
  if (isDublicated) {
    response.status(409).json({
      message: "Отдел уже существует!",
    });
  } else {
    try {
      const group = await new Group({
        name: request.body.name,
        ParentId: request.body.ParentId,
      }).save();
      response.status(201).json(group);
    } catch (e) {
      errorHandler(response, e);
    }
  }
};
module.exports.update = async (request, response) => {
  try {
    const group = await Group.findOneAndUpdate({ _id: request.params.id }, { $set: request.body }, { new: true });
    response.status(200).json(group);
  } catch (e) {
    errorHandler(response, e);
  }
};
module.exports.delete = async (request, response) => {
  try {
    await Group.deleteOne({ _id: request.params.id });
    response.status(200).json({
      message: "Отдел удален",
    });
  } catch (e) {
    errorHandler(response, e);
  }
};
