module.exports.login = (request, response) => {
  response.status(200).json({
    login: {
      username: request.body.username,
      password: request.body.password,
    },
  });
};

module.exports.register = (request, response) => {
  response.status(200).json({ register: true });
};
