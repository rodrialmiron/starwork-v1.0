const { where } = require("sequelize");
const { Class, InvitationUser } = require("../../db");
const orderClassNumber = require("../../utils/orderClassNumber");

const deleteClass = async (id) => {
  const classToDelete = await Class.findOne({
    where: {
      id,
    },
  });

  if (classToDelete) {
    const allInvitations = await InvitationUser.findAll({ where: { id_class: id } });
    if (allInvitations.length > 0) {
      const invitationDestroy = await InvitationUser.destroy({
        where: { id_class: id },
      });

      if (!invitationDestroy) {
        throw new Error(`No se pudo eliminar las invitaciones de la clase ${classToDelete.classTitle}`);
      }
    }
    if (classToDelete.status === true) {
      await orderClassNumber(classToDelete);
    }

    await classToDelete.destroy();

    const allClass = await Class.findAll({ where: { id_course: classToDelete.id_course } });

    return { message: `La clase ${classToDelete.classTitle} fue eliminada con éxito`, allClass };
  } else {
    throw new Error(`La clase que intentas eliminar no existe`);
  }
};

module.exports = deleteClass;
