const { Sequelize } = require("sequelize");
const { User } = require("../../db");
const { Op } = Sequelize;

const updateProfile = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  company,
  position,
  sector,
  id,
}) => {
  const searchUser = await User.findOne({
    where: {
      email,
      id: { [Op.not]: id },
    },
  });

  if (searchUser) {
    throw new Error(
      "El email que estas ingresando ya se encuentra en uso por otro usuario"
    );
  }

  const updateUser = await User.update(
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      position,
      sector,
    },
    {
      where: {
        id,
      },
    }
  );
  if (updateUser) {
    const searchUpdateUser = await User.findOne({
      where: { id },
    });
    return searchUpdateUser;
  } else {
    throw new Error("Error al modificar los datos");
  }
};

module.exports = updateProfile;
