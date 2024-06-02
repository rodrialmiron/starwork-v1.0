const bcrypt = require("bcrypt");
const { User } = require("../db");
const notify = require("../utils/notify.js");
const newPassTemplate = require("../template/newPassTemplate.js");

const recoverPassword = async (email, password) => {
  const emailVerify = await User.findOne({ where: { email } });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  if (emailVerify) {
    await User.update({ password: passwordHash }, { where: { email } });
    await notify(email, newPassTemplate(email, password));
    return { email, passwordHash };
  } else {
    throw new Error(
      "No se pudo completar esta operacion, error al verificar el email en la base de datos"
    );
  }
};

module.exports = recoverPassword;
