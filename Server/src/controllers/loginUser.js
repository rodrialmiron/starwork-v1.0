const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !passwordCorrect) {
    throw new Error("Email o contraseña incorrecta");
  }

  if (user.emailIsVerify === false) {
    throw new Error("Email no verificado");
  }

  if (!user.status) {
    throw new Error("Usuario bloqueado");
  }


  const role = user.id_role;
  const status = user.status;
  const emailIsVerify = user.emailIsVerify;

  const userForToken = {
    id: user.id,
    firstName: user.firstName,
    role: role,
    status: status,
    emailIsVerify: user.emailIsVerify,
  };

  const token = jwt.sign(userForToken, SECRET);

  return { access: true, token, id: user.id, role, status, emailIsVerify };
};

module.exports = loginUser;
