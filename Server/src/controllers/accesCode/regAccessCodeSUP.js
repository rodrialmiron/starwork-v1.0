const { AccessCode, User } = require("../../db.js");
const crypto = require("crypto");
const notify = require("../../utils/notify.js");
const invitationTemplate = require("../../template/invitationTemplate.js");

const regAccessCodeSUP = async (code, email, id, limitCode) => {
  const uniqueSegment = crypto.randomBytes(3).toString("hex");

  const fullCode = `${uniqueSegment}${code}`.toUpperCase();

  const user = await User.findByPk(id);

  if (user.usedSlot >= user.limitSlot) {
    throw new Error("Has excedido tu limite disponible para invitar colaboradores");
  }

  const [newAccessCode, created] = await AccessCode.findOrCreate({
    where: { code: fullCode },
    defaults: {
      code: fullCode,
      limitCode: limitCode,
      id_role: 3,
      id_creator: id,
    },
  });

  if (!created) {
    throw new Error("Parece que hubo un error en el registro, por favor intenta de nuevo");
  }

  await notify(email, invitationTemplate(fullCode));

  return newAccessCode;
};

module.exports = {
  regAccessCodeSUP,
};
