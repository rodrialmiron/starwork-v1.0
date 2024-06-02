const { where } = require("sequelize");
const { User, InvitationUser, AccessCode } = require("../../db");

const statusUser = async (id, status, idSession) => {
  const user = await User.findByPk(id);
  if (user) {
    const verifyPermission = await AccessCode.findOne({
      where: { id_creator: idSession, id: user.id_code },
    });

    if (!verifyPermission) {
      throw new Error("Solo quien invitó a este usuario puede cambiar su estado");
    }

    user.status = status;
    await user.save();

    const allInvitations = await InvitationUser.findAll({ where: { id_user: id } });
    if (allInvitations.length > 0) {
      const invitationUpdate = await InvitationUser.update(
        { status: status },
        {
          where: { id_user: id },
        }
      );

      if (invitationUpdate[0] === 0) {
        throw new Error(
          `No se pudieron actualizar los datos de las invitaciones del usuario ${user.lastName} ${user.firstName}`
        );
      }
    }

    let statUser;
    if (status) {
      statUser = "habilitado";
    } else {
      statUser = "inhabilitado";
    }

    return `El usuario ${user.lastName} ${user.firstName} ha sido ${statUser} correctamente`;
  } else {
    throw new Error("Usuario no encontrado");
  }
};

module.exports = statusUser;
