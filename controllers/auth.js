module.exports.login = (request, response) => {
  response.status(200).json({ login: true });
};

module.exports.register = (request, response) => {
  response.status(200).json({ register: true });
};
