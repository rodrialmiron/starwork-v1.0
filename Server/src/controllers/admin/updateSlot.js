const { User } = require("../../db");

const updateSlot = async (id, limitSlot) => {
  const user = await User.findByPk(id);

  if (user) {
    user.update({ limitSlot: limitSlot });
    return `La cantidad maxima de invitaciones del usuario ${user.firstName} ${user.lastName} ha sido modificada a ${limitSlot}`;
  } else {
    throw new Error("El usuario no se encuentra registrado en nuestro sistema");
  }
};

module.exports = updateSlot;
