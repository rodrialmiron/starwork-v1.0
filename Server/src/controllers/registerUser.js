const bcrypt = require("bcrypt");
const { User, AccessCode } = require("../db.js");

const registerUser = async (email, password, firstName, lastName, phoneNumber, company, position, sector, code) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const codeUpper = code.toUpperCase();
  const accessCode = await AccessCode.findOne({
    where: { code: codeUpper },
  });

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      firstName,
      lastName,
      password: passwordHash,
      phoneNumber,
      company,
      position,
      sector,
      id_code: accessCode.id,
      id_role: accessCode.id_role,
    },
  });

  if (created) {
    const userCreator = await User.findByPk(accessCode.id_creator);
    if (userCreator.id_role === 2) {
      await userCreator.update({ usedSlot: userCreator.usedSlot + 1 });
    }
    await accessCode.update({ usedCode: accessCode.usedCode + 1 });

    return user;
  } else {
    throw new Error("Algo salio mal");
  }
};

module.exports = registerUser;
