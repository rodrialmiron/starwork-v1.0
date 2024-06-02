const { User, InvitationUser, AccessCode } = require("../../db");

const deleteUser = async (id, idSession) => {
  const user = await User.findByPk(id);
  if (user) {
    const verifyPermission = await AccessCode.findOne({
      where: { id_creator: idSession, id: user.id_code },
    });

    if (!verifyPermission) {
      throw new Error("Solo quien invitó a este usuario puede eliminarlo");
    }

    const allInvitations = await InvitationUser.findAll({ where: { id_user: id } });
    if (allInvitations.length > 0) {
      const invitationDestroy = await InvitationUser.destroy({
        where: { id_user: id },
      });

      if (!invitationDestroy) {
        throw new Error(
          `No se pudo eliminar las invitaciones del usuario ${user.lastName} ${user.firstName}`
        );
      }
    }

    await user.destroy();

    return `Usuario ${user.lastName} ${user.firstName} eliminado correctamente`;
  } else {
    throw new Error("Usuario no encontrado");
  }
};

module.exports = deleteUser;
