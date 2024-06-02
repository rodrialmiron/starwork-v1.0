const { User, Verify } = require("../db.js");

const verifyCodeRecover = async (email, codeUser) => {
  const modeloCode = await Verify.findOne({ where: { code: codeUser } });

  if (!modeloCode) {
    throw new Error("El codigo que ingresaste es incorrecto");
  }

  if (modeloCode.email !== email) {
    throw new Error("El codigo no coincide con el email registrado");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Este email no se encuentra registrado");
  }

  return true;
};

module.exports = verifyCodeRecover;
