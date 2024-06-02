const { AccessCode } = require("../../db.js");
const crypto = require("crypto");
const notify = require("../../utils/notify.js");
const invitationTemplate = require("../../template/invitationTemplate.js");

const regAccessCodeADMIN = async (code, email, id) => {
  const uniqueSegment = crypto.randomBytes(3).toString("hex");

  const fullCode = `${uniqueSegment}${code}`.toUpperCase();

  const [newAccessCode, created] = await AccessCode.findOrCreate({
    where: { code: fullCode },
    defaults: { code: fullCode, id_role: 2, id_creator: id },
  });

  if (!created) {
    throw new Error("Parece que hubo un error en el registro, por favor intenta de nuevo");
  }

  await notify(email, invitationTemplate(fullCode));

  return newAccessCode;
};

module.exports = {
  regAccessCodeADMIN,
};
