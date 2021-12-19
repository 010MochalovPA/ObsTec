const bycript = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");

const User = require("../models/User");

module.exports.login = async (request, response) => {
  response.status(200).json({
    login: {
      username: request.body.username,
      password: request.body.password,
    },
  });
};

module.exports.register = async (request, response) => {
  // username password

  if (await User.findOne({ username: request.body.username })) {
    console.log("Пользователь уже существует");
    response.status("409").json({
      status: 409,
      message: "Пользователь уже существует",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = request.body.password;
    const user = new User({
      username: request.body.username,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      response.status(201).json(user);
    } catch (error) {
      //
    }
  }
};
