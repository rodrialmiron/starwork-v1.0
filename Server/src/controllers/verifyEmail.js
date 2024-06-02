const { User, Verify } = require("../db.js");

const verifyEmail = async (email, codeUser) => {
  const modeloCode = await Verify.findOne({ where: { code: codeUser } });

  if (!modeloCode) {
    throw new Error("Código incorrecto");
  }

  if (modeloCode.email !== email) {
    throw new Error("El codigo no coincide con el email registrado");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Email no registrado");
  }

  user.emailIsVerify = true;
  await user.save();
  
  if(user.emailIsVerify){
    await Verify.destroy({ where: { email: email } });
  }

  return "¡Email verificado exitosamente!";
};

module.exports = verifyEmail;
