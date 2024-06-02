const { AccessCode } = require("../../db.js");

const getAccessCode = async (id) => {
  const getAllCode = await AccessCode.findAll({ where: { id_creator: id } });

  if (!getAllCode || getAllCode.length === 0) {
    throw new Error("Aún no existen codigos creados");
  }
  return getAllCode;
};

module.exports = {
  getAccessCode,
};
