module.exports.getAll = (request, response) => {
  response.status(200).json({ getAll: true });
};

module.exports.create = (request, response) => {
  response.status(200).json({ CreatePerson: true });
};

module.exports.getById = (request, response) => {
  // Получить конкретного сотрудника
};

module.exports.update = (request, response) => {
  // изменить устройства
};
module.exports.delete = (request, response) => {
  // удалить устройство
};
