const { Verify } = require("../db.js");
const { addMinutes, isAfter } = require("date-fns");

const codeVerify = async (email, code, verifyCode) => {
  if (verifyCode) {
    const deletedAt = addMinutes(new Date(verifyCode.createdAt), 3);

    const dateNow = new Date();
    if (dateNow >= deletedAt) {
      await Verify.destroy({ where: { email: email } });
      console.log(`Registro con id ${verifyCode.id} eliminado`);

      const newCode = await Verify.create({ email, code });
      await Verify.update({ deletedCode: addMinutes(newCode.createdAt, 3) }, { where: { email: email } });

      return newCode.createdAt;
    } else {
      const createdAt = verifyCode.createdAt;
      return {
        error: "Su codigo ha sido enviado recientemente, debe esperar 3 minutos para solicitar uno nuevo",
        createdAt,
      };
    }
  } else {
    const newCode = await Verify.create({ email, code });
    await Verify.update({ deletedCode: addMinutes(newCode.createdAt, 3) }, { where: { email: email } });

    return newCode.createdAt;
  }
};

module.exports = codeVerify;
