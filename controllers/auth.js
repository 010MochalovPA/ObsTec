const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

const errorHandler = require("../utils/errorHandler");

module.exports.login = async (request, response) => {
  // username: String;
  // password: String;
  // expiresIn: String
  if (request.body.expiresIn) {
    console.log("yes");
  }
  const expiresInTest = request.body.expiresIn ? request.body.expiresIn : 1;

  tmpUser = await User.findOne({ username: request.body.username });
  if (tmpUser) {
    const passwordResult = bcrypt.compareSync(request.body.password, tmpUser.password);
    if (passwordResult) {
      const token = jwt.sign(
        {
          username: tmpUser.username,
          userId: tmpUser._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 * expiresInTest }
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
      errorHandler(response, error);
    }
  }
};

module.exports.reset = async (request, response) => {
  const KeyDate = new Date();
  const day = KeyDate.getDate();
  const month = KeyDate.getMonth() + 1;
  const year = KeyDate.getFullYear();
  day < 10 ? (day = "0" + day) : day;
  month < 10 ? (month = "0" + month) : month;
  if (request.body.code == `${day}${month}${year}`) {
    const salt = bcrypt.genSaltSync(10);
    const password = keys.dfltpwd;
    try {
      user = await User.findOneAndUpdate({ username: request.body.username }, { $set: { password: bcrypt.hashSync(password, salt) } }, { new: true });
      response.status(201).json(user);
    } catch (error) {
      errorHandler(response, error);
    }
  } else {
    response.status(401).json({ message: "Unauthorized" });
  }
};
