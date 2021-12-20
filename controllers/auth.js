const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

module.exports.login = async (request, response) => {
  // username: String;
  // password: String;
  // expiresIn: String
  tmpUser = await User.findOne({ username: request.body.username });
  if (tmpUser) {
    const passwordResult = bcript.compareSync(request.body.password, tmpUser.password);
    if (passwordResult) {
      const token = jwt.sign(
        {
          username: tmpUser.username,
          userId: tmpUser._id,
        },
        keys.jwt,
        { expiresIn: 60 * request.body.expiresIn }
      ); //expiresIn время жизни токена

      response.status(200).json({ token: `Bearer ${token}` });
    } else {
      response.status(401).json({ message: "Пароль введен не верно" });
    }
  } else {
    response.status(404).json({ message: "Пользователь не найден" });
  }
};

module.exports.register = async (request, response) => {
  // username: String;
  // password: String;

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
